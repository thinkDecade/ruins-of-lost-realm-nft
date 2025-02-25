import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { calculateMintGasLimit } from '@/utils/gasUtils';

// Replace with your actual contract address when deployed
const NFT_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890') as `0x${string}`;

// Full contract ABI
const NFT_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "mintBatch",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOTAL_SUPPLY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MINT_PRICE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_PER_WALLET",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export function useMintNFT() {
  const [isMinting, setIsMinting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  // Get the mint price from the contract
  const { data: mintPrice } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'MINT_PRICE',
  });

  // Get user's current balance of NFTs
  const { data: userBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Get max per wallet
  const { data: maxPerWallet } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'MAX_PER_WALLET',
  });

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const mintNFT = async () => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    // Check if user has reached max per wallet
    if (userBalance && maxPerWallet && userBalance >= maxPerWallet) {
      setError(`You've reached the maximum limit of ${maxPerWallet} NFTs per wallet`);
      return;
    }

    setIsMinting(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Use the contract's mint price or fallback to 0.00777 ETH
      const price = mintPrice || parseEther('0.00777');
      
      await writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mint',
        value: price,
        // Use our utility function to calculate a safe gas limit
        gas: calculateMintGasLimit(1),
      });
    } catch (err) {
      console.error('Error minting NFT:', err);
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
      setIsMinting(false);
    }
  };

  // Mint multiple NFTs at once
  const mintBatchNFTs = async (quantity: number) => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    // Check if user has reached max per wallet
    if (userBalance && maxPerWallet && Number(userBalance) + quantity > Number(maxPerWallet)) {
      setError(`You can only mint ${Number(maxPerWallet) - Number(userBalance)} more NFTs`);
      return;
    }

    setIsMinting(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Calculate price based on quantity
      const unitPrice = mintPrice || parseEther('0.00777');
      const totalPrice = BigInt(unitPrice) * BigInt(quantity);
      
      await writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mintBatch',
        args: [BigInt(quantity)],
        value: totalPrice,
        // Use our utility function to calculate a safe gas limit based on quantity
        gas: calculateMintGasLimit(quantity),
      });
    } catch (err) {
      console.error('Error minting NFTs:', err);
      setError(err instanceof Error ? err.message : 'Failed to mint NFTs');
      setIsMinting(false);
    }
  };

  // Update state based on transaction status
  if (isConfirmed && !isSuccess) {
    setIsSuccess(true);
    setIsMinting(false);
  }

  return {
    mintNFT,
    mintBatchNFTs,
    isMinting: isMinting || isPending || isConfirming,
    isSuccess,
    error,
    transactionHash: hash,
    mintPrice,
    userBalance: userBalance ? Number(userBalance) : 0,
    maxPerWallet: maxPerWallet ? Number(maxPerWallet) : undefined,
  };
} 