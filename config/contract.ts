export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000';

export const CONTRACT_ABI = [
  "function mint() external payable",
  "function mintBatch(uint256 quantity) external payable",
  "function balanceOf(address owner) external view returns (uint256)",
  "function MINT_PRICE() external view returns (uint256)",
  "function MAX_PER_WALLET() external view returns (uint256)",
  "function TOTAL_SUPPLY() external view returns (uint256)",
  "function totalSupply() external view returns (uint256)"
] as const; 