import { useState } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { motion } from 'framer-motion';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export default function MintingSection() {
  const [quantity, setQuantity] = useState(1);

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

  const { data: mintPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'MINT_PRICE',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-2xl border border-neon-gold/20"
    >
      <div className="text-center mb-8">
        <div className="text-3xl font-bold mb-4 hero-title">Mint Your Runes</div>
        <div className="flex justify-center items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-neon-gold animate-pulse"></span>
          <span className="text-mystic-silver/80">
            {totalSupply?.toString() || '0'} / {maxSupply?.toString() || '1000'} Minted
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center items-center gap-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 rounded-lg bg-cosmic-indigo/50 border border-neon-gold/20 text-2xl hover:bg-neon-gold/20 transition-all duration-300"
          >
            -
          </button>
          <div className="w-20 text-center">
            <div className="text-3xl font-bold text-neon-gold">{quantity}</div>
            <div className="text-xs text-mystic-silver/60">QUANTITY</div>
          </div>
          <button 
            onClick={() => setQuantity(Math.min(5, quantity + 1))}
            className="w-12 h-12 rounded-lg bg-cosmic-indigo/50 border border-neon-gold/20 text-2xl hover:bg-neon-gold/20 transition-all duration-300"
          >
            +
          </button>
        </div>

        <div className="p-4 rounded-lg bg-cosmic-indigo/30 border border-neon-gold/20">
          <div className="text-center">
            <div className="text-sm text-mystic-silver/60">Total Price</div>
            <div className="text-2xl font-bold text-neon-gold">
              {mintPrice ? (Number(mintPrice) * quantity / 1e18).toFixed(3) : '0.1'} ETH
            </div>
          </div>
        </div>

        <button className="w-full py-4 px-8 rounded-lg bg-gradient-to-r from-neon-gold to-luminous-cyan text-midnight-blue font-bold text-lg hover:shadow-lg hover:shadow-neon-gold/20 transition-all duration-300">
          Mint Now
        </button>
      </div>
    </motion.div>
  );
} 