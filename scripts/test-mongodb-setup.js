// Quick test script to verify MongoDB setup
// Run with: node test-mongodb-setup.js

const tests = []
let passed = 0
let failed = 0

console.log('🧪 Testing MongoDB Setup...\n')

// Test 1: Backend Health
async function testBackendHealth() {
  try {
    const response = await fetch('http://localhost:5000/api/health')
    const data = await response.json()
    
    if (data.status === 'ok' && data.database === 'MongoDB') {
      console.log('✅ Test 1: Backend Health - PASSED')
      console.log(`   Database: ${data.database}, Users: ${data.users}`)
      passed++
      return true
    } else {
      console.log('❌ Test 1: Backend Health - FAILED')
      console.log('   Backend not connected to MongoDB')
      failed++
      return false
    }
  } catch (error) {
    console.log('❌ Test 1: Backend Health - FAILED')
    console.log(`   Error: ${error.message}`)
    failed++
    return false
  }
}

// Test 2: Login API
async function testLogin() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@moviefy.com',
        password: 'admin123'
      })
    })
    
    const data = await response.json()
    
    if (data.success && data.token && data.user) {
      console.log('✅ Test 2: Login API - PASSED')
      console.log(`   User: ${data.user.name} (${data.user.role})`)
      passed++
      return true
    } else {
      console.log('❌ Test 2: Login API - FAILED')
      console.log('   Login unsuccessful')
      failed++
      return false
    }
  } catch (error) {
    console.log('❌ Test 2: Login API - FAILED')
    console.log(`   Error: ${error.message}`)
    failed++
    return false
  }
}

// Test 3: Register API
async function testRegister() {
  try {
    const testEmail = `test${Date.now()}@test.com`
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: 'test123456'
      })
    })
    
    const data = await response.json()
    
    if (data.success && data.token && data.user) {
      console.log('✅ Test 3: Register API - PASSED')
      console.log(`   Created user: ${data.user.email}`)
      passed++
      return true
    } else {
      console.log('❌ Test 3: Register API - FAILED')
      console.log('   Registration unsuccessful')
      failed++
      return false
    }
  } catch (error) {
    console.log('❌ Test 3: Register API - FAILED')
    console.log(`   Error: ${error.message}`)
    failed++
    return false
  }
}

// Run all tests
async function runTests() {
  console.log('━'.repeat(50))
  console.log('Starting tests...\n')
  
  await testBackendHealth()
  console.log()
  
  await testLogin()
  console.log()
  
  await testRegister()
  console.log()
  
  console.log('━'.repeat(50))
  console.log('\n📊 Test Results:')
  console.log(`   ✅ Passed: ${passed}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   Total: ${passed + failed}`)
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! MongoDB setup is complete!')
    console.log('\n✅ Your app is ready to use:')
    console.log('   Frontend: http://localhost:5173')
    console.log('   Backend: http://localhost:5000')
    console.log('   Database: MongoDB (moviefy)')
  } else {
    console.log('\n⚠️  Some tests failed. Please check:')
    console.log('   1. MongoDB service is running')
    console.log('   2. Backend server is running')
    console.log('   3. Check backend logs for errors')
  }
  
  console.log('━'.repeat(50))
}

// Run tests
runTests().catch(error => {
  console.error('Test suite error:', error)
  process.exit(1)
})
