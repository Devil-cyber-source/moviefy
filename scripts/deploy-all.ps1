# PowerShell Automated Deployment Script
# This script automates as much as possible

Write-Host "🚀 Moviefy Automated Deployment" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Railway CLI is installed
Write-Host "📦 Checking Railway CLI..." -ForegroundColor Yellow
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Check if Vercel CLI is installed
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Yellow
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "✅ All tools installed!" -ForegroundColor Green
Write-Host ""

# Deploy Backend
Write-Host "🚂 STEP 1: Deploy Backend to Railway" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please follow these steps:" -ForegroundColor Yellow
Write-Host "1. Login to Railway when prompted" -ForegroundColor White
Write-Host "2. Create a new project or select existing" -ForegroundColor White
Write-Host "3. Enter your MongoDB connection string when asked" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"

# Login to Railway
Write-Host "🔐 Opening Railway login..." -ForegroundColor Yellow
railway login

# Navigate to backend and deploy
Set-Location backend
Write-Host "🚀 Deploying backend..." -ForegroundColor Yellow
railway up

# Get MongoDB URI
Write-Host ""
Write-Host "⚙️ Setting up environment variables..." -ForegroundColor Yellow
$mongoUri = Read-Host "Enter your MongoDB connection string"

railway variables set MONGODB_URI="$mongoUri"
railway variables set PORT=5000
railway variables set JWT_SECRET="moviefy_super_secret_key_change_this_in_production_12345"
railway variables set FRONTEND_URL="http://localhost:5173"

Write-Host "✅ Backend deployed!" -ForegroundColor Green

# Get Railway URL
Write-Host ""
Write-Host "📝 Getting your Railway URL..." -ForegroundColor Yellow
Write-Host "Go to Railway dashboard and copy your backend URL" -ForegroundColor White
$railwayUrl = Read-Host "Enter your Railway backend URL (e.g., https://xxx.railway.app)"

Set-Location ..

# Deploy Frontend
Write-Host ""
Write-Host "⚡ STEP 2: Deploy Frontend to Vercel" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please follow these steps:" -ForegroundColor Yellow
Write-Host "1. Login to Vercel when prompted" -ForegroundColor White
Write-Host "2. Follow the deployment prompts" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"

# Create .env.production
Write-Host "📝 Creating production environment file..." -ForegroundColor Yellow
$envContent = @"
VITE_API_URL=$railwayUrl/api
VITE_GOOGLE_CLIENT_ID=652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com
"@
$envContent | Out-File -FilePath ".env.production" -Encoding UTF8

# Login to Vercel
Write-Host "🔐 Opening Vercel login..." -ForegroundColor Yellow
vercel login

# Deploy to Vercel
Write-Host "🚀 Deploying frontend..." -ForegroundColor Yellow
vercel --prod

Write-Host ""
Write-Host "✅ Frontend deployed!" -ForegroundColor Green

# Get Vercel URL
Write-Host ""
Write-Host "📝 Getting your Vercel URL..." -ForegroundColor Yellow
$vercelUrl = Read-Host "Enter your Vercel URL (e.g., https://moviefy-xxx.vercel.app)"

# Update Railway FRONTEND_URL
Write-Host ""
Write-Host "🔗 Updating Railway with Vercel URL..." -ForegroundColor Yellow
Set-Location backend
railway variables set FRONTEND_URL="$vercelUrl"
Set-Location ..

Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""
Write-Host "Your app is now live at:" -ForegroundColor Cyan
Write-Host $vercelUrl -ForegroundColor White
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Vercel dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Click your project → Settings → Environment Variables" -ForegroundColor White
Write-Host "3. Add these variables:" -ForegroundColor White
Write-Host "   - VITE_API_URL = $railwayUrl/api" -ForegroundColor White
Write-Host "   - VITE_GOOGLE_CLIENT_ID = 652198484625-ejlp6s43abo24s1odqu2s5c5ecsjp7l8.apps.googleusercontent.com" -ForegroundColor White
Write-Host "4. Redeploy from Vercel dashboard" -ForegroundColor White
Write-Host ""
Write-Host "✅ Then test your app!" -ForegroundColor Green
