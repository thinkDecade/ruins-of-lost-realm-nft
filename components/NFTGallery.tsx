import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NFT {
  id: number;
  image: string;
  name: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for testing
  const mockNFTs: NFT[] = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    image: "https://placehold.co/400x400",
    name: `Ancient Rune #${i + 1}`,
    attributes: [
      { trait_type: "Element", value: ["Fire", "Water", "Earth", "Air"][i % 4] },
      { trait_type: "Power", value: `Level ${Math.floor(Math.random() * 10) + 1}` },
      { trait_type: "Rarity", value: ["Common", "Rare", "Epic", "Legendary"][i % 4] }
    ]
  }));

  useEffect(() => {
    setTimeout(() => {
      setNfts(mockNFTs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[400px] flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-transparent border-t-neon-gold rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-luminous-cyan rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center hero-title"
      >
        Collection Gallery
      </motion.h2>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {nfts.map((nft) => (
          <motion.div
            key={nft.id}
            variants={item}
            className="glass-card overflow-hidden group"
          >
            <div className="relative">
              <img 
                src={nft.image} 
                alt={nft.name}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-neon-gold to-luminous-cyan bg-clip-text text-transparent">
                {nft.name}
              </h3>
              
              <div className="space-y-2">
                {nft.attributes.map((attr, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-mystic-silver/60">{attr.trait_type}</span>
                    <span className="text-luminous-cyan">{attr.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-cosmic-indigo/30 flex gap-4 justify-center">
                <a 
                  href="#"
                  className="text-sm text-neon-gold hover:text-luminous-cyan transition-colors duration-300"
                >
                  View on OpenSea
                </a>
                <a 
                  href="#"
                  className="text-sm text-neon-gold hover:text-luminous-cyan transition-colors duration-300"
                >
                  View on Arbiscan
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 