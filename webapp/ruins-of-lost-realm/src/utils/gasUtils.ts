import { parseEther } from 'viem';

/**
 * Calculates a safe gas limit for NFT minting operations
 * @param quantity Number of NFTs to mint
 * @returns A BigInt representing the gas limit
 */
export function calculateMintGasLimit(quantity: number = 1): bigint {
  // Base gas amount for a transaction
  const baseGas = 250000;
  
  // Additional gas per NFT
  const gasPerNFT = 100000;
  
  // Calculate total gas with a 20% buffer for safety
  const totalGas = Math.floor((baseGas + (quantity * gasPerNFT)) * 1.2);
  
  return BigInt(totalGas);
}

/**
 * Formats ETH value with appropriate precision for display
 * @param value The ETH value in wei (as bigint or string)
 * @returns Formatted string with appropriate decimal places
 */
export function formatETHValue(value: bigint | string | undefined): string {
  if (!value) return '0.00777';
  
  const ethValue = typeof value === 'string' ? value : value.toString();
  const formatted = parseFloat(parseEther(ethValue).toString()) / 1e18;
  
  // Format with appropriate decimal places based on value
  if (formatted < 0.0001) {
    return formatted.toFixed(8);
  } else if (formatted < 0.01) {
    return formatted.toFixed(6);
  } else {
    return formatted.toFixed(4);
  }
}

/**
 * Safely parses an ETH amount string to wei
 * @param amount ETH amount as string
 * @returns BigInt value in wei
 */
export function safeParseEther(amount: string): bigint {
  try {
    return parseEther(amount);
  } catch (error) {
    console.error('Error parsing ETH amount:', error);
    return parseEther('0.00777'); // Default fallback
  }
} 