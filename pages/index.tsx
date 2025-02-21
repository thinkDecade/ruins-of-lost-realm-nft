import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';
import Head from 'next/head';
import MintingSection from '../components/MintingSection';
import NFTGallery from '../components/NFTGallery';

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
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Runes of Lost Realm NFT</title>
        <meta name="description" content="Discover and collect mystical runes from the lost realm" />
      </Head>

      {/* Animated Background Runes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="rune-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ᚱ
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-midnight-blue/80 border-b border-cosmic-indigo">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold hero-title">
            Runes of Lost Realm
          </div>
          <ConnectButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="hero-title text-6xl md:text-7xl font-bold mb-6">
            Discover Ancient Runes
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-mystic-silver/80 max-w-2xl mx-auto">
            Collect and own mystical runes from the lost realm, each holding unique powers and ancient wisdom
          </p>
          <div className="space-y-4">
            <MintingSection />
          </div>
        </div>
      </section>

      {/* NFT Gallery */}
      <NFTGallery />

      {/* Footer */}
      <footer className="py-8 text-center text-mystic-silver/60">
        <div className="container mx-auto px-4">
          <p>© 2024 Runes of Lost Realm. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 