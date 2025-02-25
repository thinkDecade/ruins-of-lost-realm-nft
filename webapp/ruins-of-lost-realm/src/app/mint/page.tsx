'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, GemIcon, CheckCircle, Loader2, MinusIcon, PlusIcon } from "lucide-react";
import RuinsBackground from "@/components/RuinsBackground";
import PortalBackground from "@/components/PortalBackground";
import { useMintNFT } from "@/hooks/useMintNFT";
import { useNFTSupply } from "@/hooks/useNFTSupply";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { formatETHValue } from "@/utils/gasUtils";

const MintPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { mintNFT, mintBatchNFTs, isMinting, isSuccess, error, transactionHash, mintPrice, userBalance, maxPerWallet } = useMintNFT();
  const { remaining, totalSupply, isLoading: isLoadingSupply } = useNFTSupply();
  const { isConnected } = useAccount();

  // Format the mint price for display using our utility
  const formattedPrice = formatETHValue(mintPrice ? formatEther(mintPrice) : "0.00777");
  
  // Calculate total price based on quantity
  const totalPrice = (parseFloat(formattedPrice) * quantity).toFixed(5);

  // Handle mint button click
  const handleMint = async () => {
    if (quantity === 1) {
      await mintNFT();
    } else {
      await mintBatchNFTs(quantity);
    }
  };

  // Handle quantity changes
  const increaseQuantity = () => {
    if (maxPerWallet && userBalance + quantity >= maxPerWallet) return;
    if (remaining && quantity >= remaining) return;
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Check if user can mint based on remaining and wallet limits
  const canMint = 
    isConnected && 
    !(remaining !== undefined && remaining <= 0) &&
    !(maxPerWallet && userBalance + quantity > maxPerWallet);

  return (
    <div className="min-h-screen text-realm-white relative overflow-hidden">
      <RuinsBackground />
      <PortalBackground />
      
      {/* Magical overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-realm-black/10 to-realm-black/30 pointer-events-none" />
      
      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
        <div className="font-cinzel text-xl text-realm-gold tracking-wider">
          Ruins of Lost Realm
        </div>
        <Link href="/">
          <Button 
            variant="outline" 
            className="bg-realm-black/50 border-realm-cyan text-realm-gold hover:bg-realm-gold hover:text-realm-black transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 animate-fade-up backdrop-blur-sm bg-realm-cosmic/20 p-8 rounded-lg border border-realm-cyan/20 max-w-2xl">
          <h1 className="font-cinzel text-3xl md:text-4xl text-realm-gold animate-glow [text-shadow:0_0_30px_rgba(248,166,26,0.3)]">
            Mint Your Artifact
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-realm-black/40 p-6 rounded-lg border border-realm-cyan/30">
              <div className="aspect-square rounded-lg bg-realm-cosmic flex items-center justify-center overflow-hidden">
                <div className="w-3/4 h-3/4 bg-realm-gold/20 rounded-lg animate-pulse flex items-center justify-center">
                  <GemIcon className="w-16 h-16 text-realm-gold" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h2 className="font-cinzel text-2xl text-realm-white mb-2">Ancient Artifact</h2>
                <p className="text-realm-white/80 text-sm">
                  Each artifact contains mystical powers from the lost realm. Only {totalSupply ?? 8} exist in the entire collection.
                </p>
                <div className="mt-4 text-realm-white/80 text-sm font-cinzel">
                  {isLoadingSupply ? (
                    <span>Loading supply...</span>
                  ) : (
                    <span>
                      <span className="text-realm-gold">{remaining ?? '?'}</span>/{totalSupply ?? 8} Artifacts Remaining
                    </span>
                  )}
                </div>
                
                {maxPerWallet && (
                  <div className="mt-2 text-realm-white/80 text-sm">
                    <span>Max {maxPerWallet} per wallet • You own {userBalance}</span>
                  </div>
                )}
                
                <div className="mt-4">
                  <p className="text-realm-gold text-xl font-cinzel">{formattedPrice} ETH per NFT</p>
                </div>
                
                {!isSuccess && (
                  <div className="mt-4 flex items-center justify-center space-x-4">
                    <Button 
                      onClick={decreaseQuantity} 
                      disabled={quantity <= 1 || isMinting}
                      className="bg-realm-black/50 border border-realm-cyan text-realm-gold hover:bg-realm-gold hover:text-realm-black h-10 w-10 p-0 rounded-full"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-cinzel text-realm-white w-8 text-center">{quantity}</span>
                    <Button 
                      onClick={increaseQuantity} 
                      disabled={
                        isMinting || 
                        (maxPerWallet !== undefined && userBalance + quantity >= maxPerWallet) || 
                        (remaining !== undefined && quantity >= remaining)
                      }
                      className="bg-realm-black/50 border border-realm-cyan text-realm-gold hover:bg-realm-gold hover:text-realm-black h-10 w-10 p-0 rounded-full"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {quantity > 1 && (
                  <div className="mt-2 text-realm-white/80 text-sm">
                    Total: {totalPrice} ETH
                  </div>
                )}
              </div>
              
              {isSuccess ? (
                <div className="space-y-4">
                  <div className="bg-realm-black/40 p-4 rounded-lg border border-realm-cyan/30 flex items-center">
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>Artifact minted successfully!</span>
                  </div>
                  {transactionHash && (
                    <a 
                      href={`https://etherscan.io/tx/${transactionHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-realm-cyan hover:text-realm-gold underline text-sm"
                    >
                      View transaction on Etherscan
                    </a>
                  )}
                  <Link href="/" className="block">
                    <Button 
                      size="lg"
                      className="bg-realm-purple text-realm-white hover:bg-realm-cosmic font-cinzel text-lg px-8 py-6 animate-float relative overflow-hidden group w-full"
                    >
                      <span className="relative flex items-center justify-center">
                        Return to Home
                      </span>
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  size="lg"
                  className="bg-realm-gold text-realm-black hover:bg-realm-amber font-cinzel text-lg px-8 py-6 animate-float relative overflow-hidden group w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleMint}
                  disabled={isMinting || !canMint}
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      <span>Minting...</span>
                    </>
                  ) : !isConnected ? (
                    <span>Connect Wallet to Mint</span>
                  ) : (remaining !== undefined && remaining <= 0) ? (
                    <span>Sold Out</span>
                  ) : (maxPerWallet !== undefined && userBalance + quantity > maxPerWallet) ? (
                    <span>Exceeds Wallet Limit</span>
                  ) : (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-realm-gold via-realm-amber to-realm-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex items-center justify-center">
                        <GemIcon className="mr-2 h-5 w-5" />
                        {quantity > 1 ? `Mint ${quantity} Artifacts` : 'Mint Now'}
                      </span>
                    </>
                  )}
                </Button>
              )}
              
              {error && (
                <div className="bg-red-900/40 p-3 rounded-lg border border-red-500/30 text-red-200 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6 flex justify-center items-center">
        <p className="font-cinzel animate-glow text-realm-purple hover:text-realm-white transition-colors [text-shadow:0_0_10px_rgba(105,54,200,0.2)]">
          The realm is awakening...
        </p>
      </footer>
    </div>
  );
};

export default MintPage; 