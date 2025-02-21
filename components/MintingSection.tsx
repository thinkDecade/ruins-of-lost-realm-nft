import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MintingSection() {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-8 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-neon-gold to-transparent"></div>
        <h2 className="text-3xl font-bold mb-4 hero-title">Mint Your Runes</h2>
        <p className="text-mystic-silver/80 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-luminous-cyan animate-pulse"></span>
          250 / 1000 Minted
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 bg-cosmic-indigo/20 p-4 rounded-lg">
          <button 
            className="quantity-btn hover:rotate-180 transition-transform duration-300"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <div className="w-20 text-center">
            <span className="text-2xl font-bold text-luminous-cyan">{quantity}</span>
            <p className="text-xs text-mystic-silver/60">QUANTITY</p>
          </div>
          <button 
            className="quantity-btn hover:-rotate-180 transition-transform duration-300"
            onClick={() => setQuantity(Math.min(5, quantity + 1))}
          >
            +
          </button>
        </div>

        <div className="text-center bg-cosmic-indigo/20 p-4 rounded-lg w-full">
          <p className="text-mystic-silver/80 text-sm mb-1">Total Price</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-neon-gold to-luminous-cyan bg-clip-text text-transparent">
            0.1 ETH
          </p>
        </div>

        <button className="btn-primary w-full group relative">
          <span className="relative z-10">Mint Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-gold to-luminous-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        <div className="text-center text-sm text-mystic-silver/60">
          Max 5 Runes per transaction
        </div>
      </div>
    </motion.div>
  );
} 