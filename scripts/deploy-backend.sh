#!/bin/bash
# Automated Backend Deployment Script

echo "🚀 Deploying Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Please login to Railway..."
railway login

# Navigate to backend
cd backend

# Link to Railway project
echo "🔗 Linking to Railway project..."
railway link

# Deploy
echo "🚀 Deploying backend..."
railway up

# Set environment variables
echo "⚙️ Setting environment variables..."
echo "Please enter your MongoDB connection string:"
read MONGODB_URI

railway variables set MONGODB_URI="$MONGODB_URI"
railway variables set PORT=5000
railway variables set JWT_SECRET="moviefy_super_secret_key_change_this_in_production_12345"
railway variables set FRONTEND_URL="http://localhost:5173"

echo "✅ Backend deployed successfully!"
echo "📝 Don't forget to update FRONTEND_URL after deploying frontend"

cd ..
