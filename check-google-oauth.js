// Quick diagnostic script to check Google OAuth setup
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 Checking Google OAuth Configuration...\n')

// Check .env file
const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists')
  const envContent = fs.readFileSync(envPath, 'utf8')
  
  const match = envContent.match(/VITE_GOOGLE_CLIENT_ID=(.+)/)
  if (match && match[1]) {
    const clientId = match[1].trim()
    console.log(`✅ Client ID found: ${clientId.substring(0, 30)}...`)
    console.log(`   Length: ${clientId.length} characters`)
    
    // Check if it looks valid
    if (clientId.includes('.apps.googleusercontent.com')) {
      console.log('✅ Client ID format looks correct')
    } else {
      console.log('⚠️  Client ID might be invalid (should end with .apps.googleusercontent.com)')
    }
  } else {
    console.log('❌ VITE_GOOGLE_CLIENT_ID not found or empty')
  }
} else {
  console.log('❌ .env file not found')
}

console.log('\n📋 Next Steps:')
console.log('1. Go to: https://console.cloud.google.com/')
console.log('2. Create a new project or select existing')
console.log('3. Enable Google+ API')
console.log('4. Create OAuth 2.0 Client ID')
console.log('5. Add authorized origin: http://localhost:5173')
console.log('6. Copy the Client ID')
console.log('7. Update .env file with the new Client ID')
console.log('8. Restart the dev server')
