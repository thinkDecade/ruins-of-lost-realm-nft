import { useState } from 'react';

export default function MintingSection() {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <div className="bg-cosmic-indigo/30 rounded-xl p-8 backdrop-blur-lg border border-cosmic-indigo">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Mint Your Runes</h2>
        <p className="text-mystic-silver/80">
          250 / 1000 Minted
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            className="btn-secondary w-10 h-10"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="text-2xl font-bold">{quantity}</span>
          <button 
            className="btn-secondary w-10 h-10"
            onClick={() => setQuantity(Math.min(5, quantity + 1))}
          >
            +
          </button>
        </div>

        <div className="text-center">
          <p className="text-mystic-silver/80 mb-2">Total Price</p>
          <p className="text-2xl font-bold">0.1 ETH</p>
        </div>

        <button className="btn-primary w-full">
          Mint Now
        </button>
      </div>
    </div>
  );
} 