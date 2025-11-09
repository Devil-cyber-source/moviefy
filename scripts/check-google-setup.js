// Quick check script to verify Google OAuth setup
// Run with: node check-google-setup.js

const fs = require('fs')
const path = require('path')

console.log('🔍 Checking Google OAuth Setup...\n')

let allGood = true

// Check 1: .env file exists
console.log('1️⃣  Checking .env file...')
const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  console.log('   ✅ .env file found')
  
  // Check if it has the Client ID
  const envContent = fs.readFileSync(envPath, 'utf8')
  if (envContent.includes('VITE_GOOGLE_CLIENT_ID')) {
    const match = envContent.match(/VITE_GOOGLE_CLIENT_ID=(.+)/)
    if (match && match[1] && match[1].trim() && !match[1].includes('your_')) {
      console.log('   ✅ VITE_GOOGLE_CLIENT_ID is set')
      console.log(`   📝 Client ID: ${match[1].substring(0, 20)}...`)
    } else {
      console.log('   ⚠️  VITE_GOOGLE_CLIENT_ID is empty or placeholder')
      console.log('   👉 Add your real Client ID from Google Console')
      allGood = false
    }
  } else {
    console.log('   ❌ VITE_GOOGLE_CLIENT_ID not found in .env')
    console.log('   👉 Add: VITE_GOOGLE_CLIENT_ID=your_client_id')
    allGood = false
  }
} else {
  console.log('   ❌ .env file not found')
  console.log('   👉 Create .env file in project root')
  console.log('   👉 Copy from .env.example')
  allGood = false
}

console.log()

// Check 2: Package installed
console.log('2️⃣  Checking @react-oauth/google package...')
const packageJsonPath = path.join(__dirname, 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  if (packageJson.dependencies && packageJson.dependencies['@react-oauth/google']) {
    console.log('   ✅ @react-oauth/google is installed')
  } else {
    console.log('   ❌ @react-oauth/google not found')
    console.log('   👉 Run: npm install @react-oauth/google')
    allGood = false
  }
} else {
  console.log('   ⚠️  package.json not found')
}

console.log()

// Check 3: Files exist
console.log('3️⃣  Checking required files...')
const requiredFiles = [
  'src/components/GoogleLoginButton.jsx',
  'src/main.jsx',
  'src/pages/Login.jsx',
  'src/context/AuthContext.jsx'
]

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`   ✅ ${file}`)
  } else {
    console.log(`   ❌ ${file} not found`)
    allGood = false
  }
})

console.log()

// Final result
console.log('━'.repeat(50))
if (allGood) {
  console.log('✅ All checks passed!')
  console.log()
  console.log('🚀 Next steps:')
  console.log('   1. Make sure dev server is running: npm run dev')
  console.log('   2. Open: http://localhost:5173/login')
  console.log('   3. Click "Continue with Google"')
  console.log('   4. Test the login!')
} else {
  console.log('⚠️  Some issues found. Please fix them and try again.')
  console.log()
  console.log('📚 Need help? Check:')
  console.log('   - QUICK_START_GOOGLE_LOGIN.md')
  console.log('   - GOOGLE_OAUTH_SETUP.md')
}
console.log('━'.repeat(50))
