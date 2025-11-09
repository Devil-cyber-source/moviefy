# 🎁 Referral Reward System - How It Works

## Overview
Users earn **1 FREE MONTH** of subscription for every **3 friends** who sign up AND purchase a subscription using their referral code.

## Step-by-Step Process

### 1️⃣ User Gets Referral Code
- Every user gets a unique referral code (e.g., `DEMO2024`)
- Visible on their Profile page
- Can copy code OR full referral link

### 2️⃣ Share with Friends
User shares either:
- **Referral Code**: `DEMO2024`
- **Referral Link**: `http://localhost:5173/signup?ref=DEMO2024`

### 3️⃣ Friend Signs Up
- Friend clicks link or enters code during signup
- Code auto-fills if using referral link
- Green checkmark shows code is applied
- Friend gets trial subscription

### 4️⃣ Friend Buys Subscription
- Friend goes to Subscription page
- Selects a plan (Basic/Standard/Premium)
- Completes payment on Checkout page
- **This triggers the reward system!**

### 5️⃣ Reward Calculation
System automatically:
1. Marks friend as "purchased"
2. Counts total referred friends who purchased
3. Calculates rewards: `Math.floor(purchasedCount / 3)`
4. Awards 1 month per 3 purchases

### 6️⃣ Reward Display
On Profile page, user sees:
- **Friends Referred**: Total count
- **Free Months Available**: Ready to use
- **Total Rewards Earned**: Lifetime total

### 7️⃣ Using Rewards
When user buys subscription:
- Bonus months shown in checkout
- Automatically added to subscription duration
- Green notification shows bonus applied
- Rewards reset to 0 after use

## Example Scenario

**User A** (Referral Code: `ABC123`)
1. Shares code with 5 friends
2. Friend 1 signs up → No reward yet
3. Friend 2 signs up → No reward yet
4. Friend 3 signs up → No reward yet
5. Friend 1 buys subscription → No reward yet (only 1 purchase)
6. Friend 2 buys subscription → No reward yet (only 2 purchases)
7. Friend 3 buys subscription → **🎉 User A gets 1 FREE MONTH!**
8. Friend 4 signs up and buys → No new reward (need 3 more)
9. Friend 5 signs up and buys → No new reward (need 1 more)
10. Friend 6 signs up and buys → **🎉 User A gets another FREE MONTH!**

## Technical Implementation

### Database Structure
```javascript
user.referral = {
  code: 'ABC123',              // Unique code
  referredBy: 'XYZ789',        // Who referred this user
  referredUsers: [1, 2, 3],    // IDs of referred users
  rewards: 2,                  // Available free months
  rewardsEarned: 2,            // Total earned (lifetime)
  hasPurchased: true           // Has this user purchased?
}
```

### Reward Logic
```javascript
// Count purchases
purchasedCount = referredUsers.filter(u => u.hasPurchased).length

// Calculate rewards
newRewards = Math.floor(purchasedCount / 3)

// Award difference
if (newRewards > rewardsEarned) {
  rewards += (newRewards - rewardsEarned)
  rewardsEarned = newRewards
}
```

### Subscription Extension
```javascript
// Base duration
baseDays = 30 // 1 month

// Add bonus
bonusDays = rewards * 30

// Total subscription
totalDays = baseDays + bonusDays
endDate = startDate + totalDays
```

## Visual Indicators

### Profile Page
- 🎁 Referral section with stats
- ✨ Pulsing green badge when rewards available
- Copy buttons for code and link

### Checkout Page
- 🎁 Bonus row in price breakdown
- Green highlight for bonus months
- Confirmation message after payment

### Signup Page
- ✓ Green checkmark when code applied
- Bonus message for referred users

## Benefits

### For Users
- Free subscription months
- Easy sharing (code or link)
- Track referral success
- Automatic reward application

### For Platform
- Viral growth mechanism
- User acquisition through referrals
- Increased engagement
- Reduced marketing costs

## Testing

1. Login as user: `user@moviefy.com` / `user123`
2. Go to Profile → Copy referral code `DEMO2024`
3. Logout and signup 3 new accounts with this code
4. Login to each new account and buy a subscription
5. Login back as original user
6. Check Profile → Should see 1 free month available!
7. Buy a subscription → Bonus automatically applied

---

**Note**: This is a simulated system using localStorage. In production, this would use a real database with proper transaction handling and fraud prevention.
