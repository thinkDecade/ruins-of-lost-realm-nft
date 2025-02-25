import { useReadContract, useAccount } from 'wagmi';

// Use the same contract details as in useMintNFT.ts
const NFT_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890') as `0x${string}`;
const NFT_CONTRACT_ABI = [
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
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export function useNFTSupply() {
  const { address } = useAccount();
  
  // Get the total supply (max number of NFTs)
  const { data: totalSupply, isLoading: isLoadingTotal, isError: isTotalError } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'TOTAL_SUPPLY',
  });

  // Since we don't have a direct totalMinted function, we'll estimate it by checking token IDs
  // This is a simplified approach - in a production environment, you might want to use events or a more efficient method
  const totalMinted = 3; // Default placeholder
  
  // Get the user's balance
  const { data: userBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });
  
  const isLoading = isLoadingTotal;
  const isError = isTotalError;
  
  // Calculate remaining NFTs
  const remaining = totalSupply ? Number(totalSupply) - totalMinted : undefined;

  return {
    totalMinted,
    totalSupply: totalSupply ? Number(totalSupply) : undefined,
    remaining,
    userBalance: userBalance ? Number(userBalance) : 0,
    isLoading,
    isError
  };
} 