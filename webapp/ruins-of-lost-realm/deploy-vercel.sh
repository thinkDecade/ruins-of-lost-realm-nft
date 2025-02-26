#!/bin/bash

# Deployment script for Vercel

echo "🚀 Preparing to deploy to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Create a .env.production file with the required environment variables
echo "Creating production environment variables..."
cat > .env.production << EOL
# NFT Contract Address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x89185fb6FC7a6dFF9aefcAb5737ac173f6d49492

# Wallet Connect Project ID (required for RainbowKit)
# You'll need to get this from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=

# Optional: Analytics ID
NEXT_PUBLIC_ANALYTICS_ID=
EOL

echo "✅ Environment file created. Please edit .env.production to add your WalletConnect Project ID."
echo "📝 You can get a WalletConnect Project ID from https://cloud.walletconnect.com/"
echo ""
echo "Once you've added your WalletConnect Project ID, run the following commands:"
echo ""
echo "1. To deploy with the Vercel CLI (recommended if you have it set up):"
echo "   vercel"
echo ""
echo "2. For production deployment:"
echo "   vercel --prod"
echo ""
echo "3. Alternatively, deploy via the Vercel dashboard:"
echo "   - Go to https://vercel.com/import"
echo "   - Connect your GitHub repository"
echo "   - Set the root directory to the current directory"
echo "   - Add the environment variables from .env.production"
echo "   - Deploy!"
echo ""
echo "🎉 Good luck with your NFT minting app!" 