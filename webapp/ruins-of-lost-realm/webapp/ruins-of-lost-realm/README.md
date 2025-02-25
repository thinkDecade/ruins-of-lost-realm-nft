# Ruins of Lost Realm NFT Minting App

A Next.js application for minting NFTs from the Ruins of Lost Realm collection.

## Features

- Connect wallet using RainbowKit
- View NFT collection details
- Mint single or multiple NFTs
- Track minting progress and remaining supply
- Optimized gas usage for Ethereum transactions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thinkDecade/ruins-of-lost-realm-nft.git
   cd ruins-of-lost-realm-nft/webapp/ruins-of-lost-realm
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x89185fb6FC7a6dFF9aefcAb5737ac173f6d49492
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

The easiest way to deploy this app is using Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the environment variables in the Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Using the Deployment Script

We've included a deployment script to simplify the process:

```bash
./deploy.sh
```

This will build the application and provide instructions for deploying to various platforms.

## Contract Information

- Contract Address: `0x89185fb6FC7a6dFF9aefcAb5737ac173f6d49492`
- Network: Ethereum Mainnet
- Mint Price: 0.00777 ETH

## Technologies Used

- Next.js 15
- React 19
- TailwindCSS
- RainbowKit
- wagmi
- viem
- Three.js for 3D effects

## License

This project is licensed under the MIT License - see the LICENSE file for details. 