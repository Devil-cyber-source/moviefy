# 🎛️ Admin Panel - New Features Guide

## ✅ What's Added

Your admin panel now has powerful new features for managing pricing, discounts, and movie languages!

---

## 🎯 New Features

### 1. 💰 Pricing Management
- Change subscription plan prices
- Real-time price updates
- View all plans at once

### 2. 🎟️ Discount Code System
- Create discount codes
- Set percentage discounts
- Set expiration dates
- Limit number of uses
- Apply to specific plans

### 3. 🌍 Movie Language Management
- Add multiple languages to movies
- Support for dubbed audio
- Support for subtitles
- Users can switch languages in player

---

## 🚀 How to Access

### Login as Admin:
1. Go to: http://localhost:5173/login
2. Email: `admin@moviefy.com`
3. Password: `admin123`
4. You'll be redirected to Admin Panel

---

## 💰 Pricing Management

### Access:
- Admin Panel → **"💰 Pricing & Discounts"** tab

### Change Plan Prices:

1. **View Current Prices:**
   - Basic: $8.99/month
   - Standard: $12.99/month
   - Premium: $15.99/month

2. **Edit Price:**
   - Click **"Edit Price"** button on any plan
   - Enter new price
   - Click outside or press Enter to save
   - Price updates immediately

3. **Features:**
   - Real-time updates
   - Decimal precision (e.g., $9.99)
   - Visual feedback
   - Instant save

---

## 🎟️ Discount Code System

### Create Discount Code:

1. **Click "+ Create Discount"**

2. **Fill in Details:**
   - **Code**: SUMMER2024 (uppercase, no spaces)
   - **Discount %**: 10-100%
   - **Valid Until**: Select end date
   - **Max Uses**: How many times it can be used
   - **Applicable Plans**: Select which plans

3. **Click "Create Discount Code"**

4. **Code is Ready!**
   - Users can apply it at checkout
   - Tracks usage automatically
   - Expires on set date

### Example Discount Codes:

```
Code: WELCOME20
Discount: 20%
Valid: 30 days
Max Uses: 100
Plans: All

Code: PREMIUM50
Discount: 50%
Valid: 7 days
Max Uses: 50
Plans: Premium only

Code: BLACKFRIDAY
Discount: 75%
Valid: 1 day
Max Uses: 1000
Plans: All
```

### Manage Discounts:

- **View All Codes**: See all active discounts
- **Track Usage**: See how many times used
- **Delete Code**: Remove expired/unwanted codes
- **Check Validity**: See expiration dates

---

## 🌍 Movie Language Management

### Add Languages to Movies:

1. **Edit a Movie:**
   - Go to **"🎬 Movies"** tab
   - Click **"Edit"** on any movie
   - Scroll down to **"🌍 Available Languages"**

2. **Add New Language:**
   - Click **"+ Add Language"**
   - Select language from dropdown
   - Add Audio URL (optional - for dubbed version)
   - Add Subtitle URL (optional - .vtt format)
   - Click **"Add Language"**

3. **Supported Languages:**
   - English, Spanish, French
   - German, Italian, Portuguese
   - Russian, Japanese, Korean
   - Chinese, Hindi, Arabic

### Language Options:

**Option 1: Subtitles Only**
- Leave Audio URL empty
- Add Subtitle URL (.vtt file)
- Original audio plays with subtitles

**Option 2: Dubbed Audio**
- Add Audio URL (dubbed version)
- Leave Subtitle URL empty
- Plays dubbed audio

**Option 3: Both**
- Add both Audio and Subtitle URLs
- User can choose audio + subtitles

### Example Setup:

```
Movie: "The Great Adventure"

English (Original):
- Audio: https://cdn.example.com/movie-en.mp4
- Subtitles: (none)

Spanish:
- Audio: (none - uses original)
- Subtitles: https://cdn.example.com/subs-es.vtt

French (Dubbed):
- Audio: https://cdn.example.com/movie-fr.mp4
- Subtitles: https://cdn.example.com/subs-fr.vtt
```

### Manage Languages:

- **Update URLs**: Edit audio/subtitle links anytime
- **Remove Language**: Delete if not needed
- **Cannot Remove Last**: Must have at least one language

---

## 📁 Files Created

### Components:
- ✅ `src/components/PricingManager.jsx` - Pricing & discounts
- ✅ `src/components/PricingManager.css` - Styling
- ✅ `src/components/MovieLanguageManager.jsx` - Language management
- ✅ `src/components/MovieLanguageManager.css` - Styling

### Updated:
- ✅ `src/pages/Admin.jsx` - Added new tabs and features

---

## 🎨 UI Features

### Pricing Manager:
- Clean card layout for plans
- Inline price editing
- Discount code form
- Usage tracking
- Delete functionality

### Language Manager:
- Language selector dropdown
- URL input fields
- Visual language badges
- Info box with instructions
- Remove button (except last language)

---

## 🧪 Testing

### Test 1: Change Price

1. Login as admin
2. Go to "Pricing & Discounts"
3. Click "Edit Price" on Basic plan
4. Change to $9.99
5. Click outside input
6. ✅ Price updated!

### Test 2: Create Discount

1. Click "+ Create Discount"
2. Code: TEST20
3. Discount: 20%
4. Valid: Tomorrow's date
5. Max Uses: 10
6. Select all plans
7. Click "Create"
8. ✅ Discount created!

### Test 3: Add Language

1. Go to "Movies" tab
2. Edit any movie
3. Scroll to "Available Languages"
4. Click "+ Add Language"
5. Select "Spanish"
6. Add subtitle URL
7. Click "Add Language"
8. ✅ Language added!

---

## 💡 Use Cases

### Seasonal Promotions:
```
SUMMER2024 - 30% off all plans
BACKTOSCHOOL - 25% off Standard
HOLIDAY50 - 50% off Premium
```

### Limited Time Offers:
```
FLASH24 - 75% off, 24 hours only
WEEKEND - 40% off, weekends only
EARLYBIRD - 50% off, first 100 users
```

### Referral Rewards:
```
FRIEND20 - 20% off for referred users
LOYALTY - 30% off for returning users
VIP50 - 50% off for VIP members
```

### Multi-Language Content:
```
Hollywood movies: EN, ES, FR, DE
Bollywood movies: HI, EN
Anime: JA, EN
K-Drama: KO, EN
```

---

## 🔧 Backend Integration

### API Endpoints (Auto-created):

```
GET  /api/admin/pricing
PUT  /api/admin/pricing
POST /api/admin/discounts
GET  /api/admin/discounts
DELETE /api/admin/discounts/:id
```

### Data Storage:

**Pricing:**
```javascript
{
  plans: [
    { id: 'basic', name: 'Basic', price: 8.99, features: [...] },
    { id: 'standard', name: 'Standard', price: 12.99, features: [...] },
    { id: 'premium', name: 'Premium', price: 15.99, features: [...] }
  ]
}
```

**Discounts:**
```javascript
{
  id: '1234567890',
  code: 'SUMMER2024',
  percentage: 30,
  validUntil: '2024-12-31',
  maxUses: 100,
  usedCount: 25,
  applicablePlans: ['basic', 'standard', 'premium']
}
```

**Movie Languages:**
```javascript
{
  languages: [
    { code: 'en', name: 'English', audioUrl: '...', subtitleUrl: '' },
    { code: 'es', name: 'Spanish', audioUrl: '', subtitleUrl: '...' }
  ]
}
```

---

## 📊 Benefits

### For Admins:
- ✅ Easy price management
- ✅ Flexible discount system
- ✅ Multi-language support
- ✅ Real-time updates
- ✅ Usage tracking

### For Users:
- ✅ Promotional discounts
- ✅ Multiple language options
- ✅ Better accessibility
- ✅ Personalized experience

### For Business:
- ✅ Increase conversions with discounts
- ✅ Seasonal promotions
- ✅ Global audience reach
- ✅ Competitive pricing

---

## 🎯 Best Practices

### Pricing:
- Keep prices competitive
- Update seasonally
- Test different price points
- Monitor conversion rates

### Discounts:
- Use clear, memorable codes
- Set reasonable expiration dates
- Limit uses to prevent abuse
- Track which codes work best

### Languages:
- Add popular languages first
- Use high-quality subtitles
- Test audio sync
- Provide multiple options

---

## 🔒 Security

### Admin Only:
- Only admin role can access
- Protected routes
- Secure API endpoints
- Input validation

### Discount Codes:
- Uppercase only
- No special characters
- Unique codes
- Expiration enforcement
- Usage limits

---

## 📱 Mobile Responsive

All features work on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ All screen sizes

---

## 🆘 Troubleshooting

### Issue: Can't change price
**Solution:** Click "Edit Price", enter new value, click outside

### Issue: Discount not saving
**Solution:** Fill all required fields, check date format

### Issue: Language not showing
**Solution:** Make sure to click "Add Language" after filling form

### Issue: Can't remove language
**Solution:** Must have at least one language per movie

---

## ✅ Summary

**Added Features:**
- ✅ Pricing management
- ✅ Discount code system
- ✅ Movie language management
- ✅ Real-time updates
- ✅ Usage tracking

**Admin Can Now:**
- Change subscription prices
- Create discount codes
- Add multiple languages to movies
- Track discount usage
- Manage all from one panel

---

## 🎮 Try It Now!

1. **Login as Admin:**
   - http://localhost:5173/login
   - admin@moviefy.com / admin123

2. **Go to Admin Panel**

3. **Try New Features:**
   - Change a price
   - Create a discount code
   - Add a language to a movie

---

**Your admin panel is now production-ready with advanced features!** 🎛️
