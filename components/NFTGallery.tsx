import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

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

  // For testing, let's add some mock data
  const mockNFTs: NFT[] = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    image: "https://placehold.co/400x400",
    name: `Rune #${i}`,
    attributes: [
      { trait_type: "Type", value: "Fire" },
      { trait_type: "Power", value: "Level " + (i + 1) },
    ]
  }));

  useEffect(() => {
    // For now, let's use mock data
    setNfts(mockNFTs);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neon-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-12 text-center">Collection Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <div 
            key={nft.id}
            className="bg-cosmic-indigo/30 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
          >
            <img 
              src={nft.image} 
              alt={nft.name}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
              <div className="grid grid-cols-2 gap-2">
                {nft.attributes.map((attr, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-mystic-silver/60">{attr.trait_type}:</span>
                    <span className="ml-1 text-luminous-cyan">{attr.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <a 
                  href={`https://opensea.io/assets/arbitrum/${CONTRACT_ADDRESS}/${nft.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neon-gold hover:underline"
                >
                  View on OpenSea
                </a>
                <span className="text-mystic-silver/60">•</span>
                <a 
                  href={`https://arbiscan.io/token/${CONTRACT_ADDRESS}?a=${nft.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neon-gold hover:underline"
                >
                  View on Arbiscan
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 