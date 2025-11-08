# Moviefy - Complete Streaming Platform

A full-featured streaming platform with authentication, subscriptions, payment gateway, admin panel, and referral system. Like Spotify for movies!

## 🎬 Features

### 🔐 Authentication System
- User login and signup
- Secure password handling
- Session management
- Demo accounts included

### 👤 User Features
- **Profile Management** - View and manage account details
- **My List** - Add/remove favorite movies
- **Video Player** - Full-featured video playback
- **Search & Browse** - Find movies by category or search
- **Referral System** - Unique referral codes with rewards tracking

### 💳 Subscription & Payment
- **3 Tier Plans** - Basic ($8.99), Standard ($13.99), Premium ($17.99)
- **Payment Gateway** - Multiple payment methods:
  - Credit/Debit Cards (Visa, Mastercard, Amex)
  - UPI Payment
  - Digital Wallets (Paytm, PhonePe, Google Pay, Amazon Pay)
- **Secure Checkout** - Encrypted payment processing
- **Subscription Management** - Upgrade/downgrade plans anytime

### 🎁 Referral Program
- Unique referral code for each user
- Track referred friends
- Earn rewards (1 month free per 3 referrals)
- Copy referral code feature

### ⚙️ Admin Dashboard
- **Movies Management** - Add, edit, delete movies with full details
- **User Management** - View all users, subscriptions, and referrals
- **Category Management** - Create and manage movie categories dynamically
- **Analytics** - Track total movies, users, subscriptions, and categories

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser to http://localhost:5173

## 🔑 Demo Accounts

### Admin Account
- Email: admin@moviefy.com
- Password: admin123
- Access: Full admin dashboard with all management features

### User Account
- Email: user@moviefy.com
- Password: user123
- Access: Standard user features

## 📱 Pages

- `/` - Home (Browse movies)
- `/login` - Login page
- `/signup` - Signup with referral code
- `/profile` - User profile and referral dashboard
- `/subscription` - Choose subscription plan
- `/checkout` - Payment gateway
- `/admin` - Admin dashboard (admin only)

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: CSS3 with modern design
- **Build Tool**: Vite
- **Storage**: LocalStorage (simulated backend)
- **State Management**: React Context API

## 💡 Key Features Explained

### Payment Gateway
- Realistic payment flow with multiple methods
- Card number formatting and validation
- UPI ID support
- Wallet integration
- Tax calculation (18%)
- Processing animation

### Subscription System
- Trial period for new users (30 days)
- Auto-renewal options
- Plan comparison
- Upgrade/downgrade functionality
- Status tracking (Active, Trial, Expired)

### Referral System
- Auto-generated unique codes
- Track referral chain
- Reward calculation
- Copy-to-clipboard functionality

### Admin Features
- Tabbed interface (Movies, Users, Categories)
- Real-time statistics
- CRUD operations for all entities
- Dynamic category management
- User subscription tracking

## 📦 Build for Production

```bash
npm run build
```

## 🎨 Design Features

- Netflix-inspired dark theme
- Smooth animations and transitions
- Responsive design for all devices
- Hover effects on movie cards
- Professional checkout UI
- Secure payment indicators

## 🔒 Security

- Password encryption simulation
- Secure payment processing UI
- Session management
- Role-based access control (Admin/User)

---

Built with ❤️ using React and Vite
