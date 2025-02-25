#!/bin/bash

# Deployment script for Ruins of Lost Realm NFT Minting App

echo "🏗️ Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Run tests if available
# echo "🧪 Running tests..."
# npm test

# Deploy to production
echo "🚀 Ready for deployment!"
echo ""
echo "To deploy to Vercel, run:"
echo "vercel --prod"
echo ""
echo "To deploy to Netlify, run:"
echo "netlify deploy --prod"
echo ""
echo "To deploy to a custom server, copy the .next folder and run:"
echo "npm start"
echo ""
echo "✅ Deployment preparation complete!" 