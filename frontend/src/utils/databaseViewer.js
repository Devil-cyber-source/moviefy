// Database Viewer Utility
// Use these functions in browser console to manage your localStorage database

export const db = {
  // View all users
  getAllUsers: () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    console.table(users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      authProvider: u.authProvider || 'email',
      plan: u.subscription?.plan,
      status: u.subscription?.status
    })))
    return users
  },

  // View current user
  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    console.log('Current User:', user)
    return user
  },

  // Find user by email
  findUser: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email)
    console.log('Found user:', user)
    return user
  },

  // Get statistics
  getStats: () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const stats = {
      totalUsers: users.length,
      emailUsers: users.filter(u => !u.authProvider || u.authProvider === 'email').length,
      googleUsers: users.filter(u => u.authProvider === 'google').length,
      phoneUsers: users.filter(u => u.authProvider === 'phone').length,
      adminUsers: users.filter(u => u.role === 'admin').length,
      activeSubscriptions: users.filter(u => u.subscription?.status === 'active').length,
      trialUsers: users.filter(u => u.subscription?.status === 'trial').length
    }
    console.table(stats)
    return stats
  },

  // Export all data
  export: () => {
    const data = {
      users: localStorage.getItem('users'),
      currentUser: localStorage.getItem('currentUser'),
      exportDate: new Date().toISOString()
    }
    const json = JSON.stringify(data, null, 2)
    console.log('Copy this data to backup:')
    console.log(json)
    
    // Create downloadable file
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `moviefy-backup-${Date.now()}.json`
    a.click()
    
    return data
  },

  // Import data
  import: (backupData) => {
    try {
      if (typeof backupData === 'string') {
        backupData = JSON.parse(backupData)
      }
      localStorage.setItem('users', backupData.users)
      if (backupData.currentUser) {
        localStorage.setItem('currentUser', backupData.currentUser)
      }
      console.log('✅ Data imported successfully! Refresh the page.')
      return true
    } catch (error) {
      console.error('❌ Import failed:', error)
      return false
    }
  },

  // Clear all data
  clear: () => {
    if (confirm('Are you sure you want to delete all data?')) {
      localStorage.removeItem('users')
      localStorage.removeItem('currentUser')
      console.log('✅ All data cleared! Refresh the page.')
      return true
    }
    return false
  },

  // Reset to default users
  reset: () => {
    if (confirm('Reset to default users?')) {
      localStorage.removeItem('users')
      localStorage.removeItem('currentUser')
      console.log('✅ Reset complete! Refresh the page.')
      return true
    }
    return false
  },

  // Add new user manually
  addUser: (email, password, name, role = 'user') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find(u => u.email === email)) {
      console.error('❌ User already exists!')
      return false
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      role,
      myList: [],
      subscription: {
        plan: 'free',
        status: 'trial',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: false
      },
      referral: {
        code: Math.random().toString(36).substring(2, 10).toUpperCase(),
        referredBy: null,
        referredUsers: [],
        rewards: 0,
        rewardsEarned: 0,
        hasPurchased: false
      },
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    console.log('✅ User added:', newUser)
    return newUser
  },

  // Delete user
  deleteUser: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const filtered = users.filter(u => u.email !== email)
    
    if (users.length === filtered.length) {
      console.error('❌ User not found!')
      return false
    }

    localStorage.setItem('users', JSON.stringify(filtered))
    console.log('✅ User deleted:', email)
    return true
  },

  // Update user subscription
  updateSubscription: (email, plan) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email)
    
    if (!user) {
      console.error('❌ User not found!')
      return false
    }

    user.subscription = {
      plan,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true
    }

    localStorage.setItem('users', JSON.stringify(users))
    console.log('✅ Subscription updated:', user)
    return user
  },

  // View raw data
  raw: () => {
    console.log('Users:', localStorage.getItem('users'))
    console.log('Current User:', localStorage.getItem('currentUser'))
  },

  // Help
  help: () => {
    console.log(`
📊 Database Viewer Commands:

View Data:
  db.getAllUsers()              - View all users in table format
  db.getCurrentUser()           - View currently logged-in user
  db.findUser('email@test.com') - Find user by email
  db.getStats()                 - View database statistics

Manage Data:
  db.addUser('email', 'pass', 'name', 'role') - Add new user
  db.deleteUser('email')                      - Delete user
  db.updateSubscription('email', 'premium')   - Update subscription

Backup & Restore:
  db.export()                   - Export and download backup
  db.import(backupData)         - Import backup data
  db.clear()                    - Clear all data
  db.reset()                    - Reset to default users

Other:
  db.raw()                      - View raw localStorage data
  db.help()                     - Show this help message

Example:
  db.addUser('test@test.com', 'test123', 'Test User', 'user')
    `)
  }
}

// Make it available globally in browser console
if (typeof window !== 'undefined') {
  window.db = db
}

export default db
