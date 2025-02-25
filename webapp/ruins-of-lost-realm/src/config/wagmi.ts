import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

// Use environment variable for project ID or fallback to a default (for development only)
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '293266ac49282a8f883a57643e8731d1';

export const config = getDefaultConfig({
  appName: 'Ruins Of Lost Realm',
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});