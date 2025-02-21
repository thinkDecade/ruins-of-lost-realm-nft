import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const CONTRACT_ABI = [
  "function mint() external payable",
  "function mintBatch(uint256 quantity) external payable",
  "function balanceOf(address owner) external view returns (uint256)",
  "function MINT_PRICE() external view returns (uint256)",
  "function MAX_PER_WALLET() external view returns (uint256)",
  "function TOTAL_SUPPLY() external view returns (uint256)",
  "function totalSupply() external view returns (uint256)"
] as const;

export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const { address, isConnected } = useAccount();

  // Contract reads
  const { data: balance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address || '0x0'],
    enabled: !!address,
  });

  const { data: mintPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'MINT_PRICE',
  }) as { data: bigint };

  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalSupply',
  });

  const { data: maxSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'TOTAL_SUPPLY',
  });

  // Contract writes
  const { write: mint, data: mintData } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: quantity === 1 ? 'mint' : 'mintBatch',
    args: quantity === 1 ? [] : [quantity],
    value: mintPrice ? (BigInt(mintPrice.toString()) * BigInt(quantity)) : BigInt(0),
  });

  const { isLoading: isMinting, isSuccess: isMinted } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full p-4 flex justify-between items-center z-10 bg-black/50 backdrop-blur-sm">
        <div className="text-xl font-bold">Runes of Lost Realms</div>
        <ConnectButton />
      </nav>

      {/* Hero Section */}
      <main className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Runes of Lost Realms
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the ancient power of magical runes from forgotten realms. Each rune holds unique powers and mysteries waiting to be unlocked.
            </p>
          </div>

          {/* Mint Card */}
          <div className="max-w-md mx-auto bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-400">Price per Rune</div>
              <div className="text-xl font-bold">
                {mintPrice ? formatEther(BigInt(mintPrice)) : '0.00777'} ETH
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-400">Remaining</div>
              <div className="text-xl font-bold">
                {maxSupply && totalSupply ? 
                  `${(Number(maxSupply) - Number(totalSupply)).toString()} / ${maxSupply.toString()}` 
                  : 'Loading...'}
              </div>
            </div>

            {isConnected ? (
              <>
                <div className="flex justify-center items-center gap-6 mb-6">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(2, quantity + 1))}
                    className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => mint?.()}
                  disabled={isMinting}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isMinting ? 'Minting...' : `Mint ${quantity} Rune${quantity > 1 ? 's' : ''}`}
                </button>

                {isMinted && (
                  <div className="mt-4 text-center text-green-400">
                    Successfully minted your Rune(s)!
                  </div>
                )}

                <div className="mt-4 text-center text-gray-400">
                  Your balance: {balance?.toString() || '0'} Runes
                </div>
              </>
            ) : (
              <div className="text-center">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 pb-8 text-center text-gray-400">
        <p>© 2024 Runes of Lost Realms. All rights reserved.</p>
      </footer>
    </div>
  );
} 