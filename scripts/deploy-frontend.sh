#!/bin/bash
# Automated Frontend Deployment Script

echo "🚀 Deploying Frontend to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel
echo "🔐 Please login to Vercel..."
vercel login

# Deploy
echo "🚀 Deploying frontend..."
vercel --prod

echo "✅ Frontend deployed successfully!"
echo "📝 Don't forget to add environment variables in Vercel dashboard"
