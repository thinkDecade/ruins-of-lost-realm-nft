import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther } from 'viem';
import Head from 'next/head';
import MintingSection from '../components/MintingSection';
import NFTGallery from '../components/NFTGallery';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-b from-midnight-blue to-cosmic-indigo">
      <Head>
        <title>Runes of Lost Realm NFT</title>
        <meta name="description" content="Discover and collect mystical runes from the lost realm" />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-midnight-blue/80 border-b border-neon-gold/20">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold hero-title"
          >
            Runes of Lost Realm
          </motion.div>
          <ConnectButton 
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
              Discover Ancient Runes
            </h1>
            <p className="text-xl md:text-2xl text-mystic-silver/80 max-w-2xl mx-auto">
              Collect and own mystical runes from the lost realm
            </p>
          </motion.div>

          {/* Minting Section */}
          <div className="max-w-xl mx-auto">
            <MintingSection />
          </div>
        </div>
      </section>

      {/* NFT Gallery */}
      <section className="py-20 px-6 bg-cosmic-indigo/30">
        <NFTGallery />
      </section>

      {/* Floating Runes Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [-10, 10, -10],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-4xl text-neon-gold/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            ᚱ
          </motion.div>
        ))}
      </div>
    </div>
  );
} 