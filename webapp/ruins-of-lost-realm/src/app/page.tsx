'use client';

import React from "react";
import PortalBackground from "@/components/PortalBackground";
import RuinsBackground from "@/components/RuinsBackground";
import { Button } from "@/components/ui/button";
import { GemIcon } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useNFTSupply } from "@/hooks/useNFTSupply";

const Home = () => {
  const { remaining, totalSupply, isLoading } = useNFTSupply();

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
          {/* <Button 
            variant="outline" 
            className="bg-realm-black/50 border-realm-cyan text-realm-gold hover:bg-realm-gold hover:text-realm-black transition-all duration-300 backdrop-blur-sm"
          >
            <Wallet2Icon className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button> */}
          <div className="bg-realm-black/50 border-realm-cyan text-realm-gold hover:bg-realm-gold hover:text-realm-black transition-all duration-300 backdrop-blur-sm">
            <ConnectButton />
          </div>
      </header>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 animate-fade-up backdrop-blur-sm bg-realm-cosmic/20 p-8 rounded-lg border border-realm-cyan/20">
          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-realm-white">
            Enter the Ruins of
            <span className="block mt-2 text-realm-gold animate-glow [text-shadow:0_0_30px_rgba(248,166,26,0.3)]">
              Lost Realm
            </span>
          </h1>
          
          <p className="text-realm-white/80 max-w-xl mx-auto text-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Discover the ancient artifacts of a forgotten civilization. Only {totalSupply ?? 8} mystical NFTs exist in this ethereal collection.
          </p>

          <div className="pt-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link href="/mint">
              <Button 
                size="lg"
                className="bg-realm-gold text-realm-black hover:bg-realm-amber font-cinzel text-lg px-8 py-6 animate-float relative overflow-hidden group"
                disabled={remaining !== undefined && remaining <= 0}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-realm-gold via-realm-amber to-realm-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center">
                  <GemIcon className="mr-2 h-5 w-5" />
                  {remaining !== undefined && remaining <= 0 ? 'Sold Out' : 'Mint an Artifact'}
                </span>
              </Button>
            </Link>
            <div className="mt-4 text-realm-white/80 text-sm font-cinzel">
              {isLoading ? (
                <span>Loading supply...</span>
              ) : (
                <span>
                  <span className="text-realm-gold">{remaining ?? '?'}</span>/{totalSupply ?? 8} Artifacts Remaining
                </span>
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

export default Home;