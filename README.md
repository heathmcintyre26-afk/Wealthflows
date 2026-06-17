# Wealthflows
A modern crypto wallet and trading platform with live market data, courses, and admin revenue management for intelligent future investing.

## Features
- 🚀 **Live Market Data** - Real-time cryptocurrency prices and market trends
- 💰 **Secure Wallet** - Enterprise-grade security with non-custodial design
- 📊 **Smart Trading** - Intelligent buy/sell suggestions based on market analysis
- 📈 **Portfolio Analytics** - Detailed insights into your investment performance
- 🎓 **Educational Courses** - Comprehensive trading courses from beginner to advanced
- 💵 **Paid Tiers & Subscriptions** - Free, Pro ($29/mo), and Premium ($99/mo) plans
- 🔐 **Admin Wallet Integration** - Connect your wallet to manage course revenue
- 🏆 **Certification Programs** - Earn certificates upon course completion
- 📱 **Mobile Ready** - Fully responsive web application

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/heathmcintyre26-afk/Wealthflows.git
cd Wealthflows
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure
```
Wealthflows/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Main navigation
│   │   └── Footer.tsx          # Footer component
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── Dashboard.tsx       # Trading dashboard
│   │   ├── Pricing.tsx         # Subscription tiers
│   │   ├── Courses.tsx         # Course marketplace
│   │   ├── CourseDetail.tsx    # Individual course page
│   │   └── Admin.tsx           # Admin wallet & revenue management
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── tailwind.config.js          # Tailwind config
└── README.md                   # This file
```

## Pages & Features

### Home (`/`)
- Hero section with value proposition
- Feature showcase (6 core features)
- Social proof and statistics
- Responsive design

### Dashboard (`/dashboard`)
- Real-time portfolio tracking
- Cryptocurrency holdings table
- Portfolio statistics (value, 24h change, %) 
- Live market data display
- Trade action buttons

### Pricing (`/pricing`)
- Three subscription tiers:
  - **Free**: Basic market data and portfolio tracking
  - **Pro** ($29/mo): Advanced analytics, alerts, 5 portfolios, API access, pro courses
  - **Premium** ($99/mo): Everything + advanced tools, VIP support, admin wallet integration, all courses
- FAQ section
- Flexible upgrade/downgrade

### Courses (`/courses`)
- 6 courses ranging from beginner to expert level
- Free and paid courses
- Course cards with ratings, duration, student count
- Filter by tier (Free/Pro/Premium)
- Quick course preview

### Course Detail (`/course/:id`)
- Full course description and curriculum
- Week-by-week breakdown
- Enrollment button
- Student ratings and reviews
- Instructor information
- Add to wishlist

### Admin Dashboard (`/admin`)
- **Wallet Connection**: Connect Ethereum wallet for revenue collection
- **Revenue Stats**: Total earnings, course revenue, wallet balance, pending payouts
- **Transaction History**: Recent course sales and payouts
- **Automatic Payouts**: Enable weekly automatic revenue distribution
- **Withdrawal Management**: Manual withdrawal options
- **Security**: Private key protection and security notices

## Subscription Tiers

### Free
- Live market data
- Portfolio tracking
- Basic analytics
- Community access
- Email support
- Access to 1 free course

### Pro ($29/month)
- Everything in Free +
- Advanced analytics
- Price alerts
- 5 custom portfolios
- API access
- Priority support
- Access to all Pro courses

### Premium ($99/month)
- Everything in Pro +
- Advanced trading tools
- Custom strategy builder
- Unlimited portfolios
- VIP community access
- 24/7 priority support
- Access to all courses + certification
- **Admin wallet integration** for revenue management

## Admin Wallet Integration

Premium users can connect their Ethereum wallet to manage course revenue:

```
Features:
- Automatic weekly payouts to connected wallet
- Real-time revenue tracking
- Transaction history
- Manual withdrawal options
- Multi-signature support (coming soon)
- Smart contract integration (coming soon)
```

### Smart Contract Integration (Future)
```solidity
// Revenue distribution smart contract
- Automated fee collection
- Multi-tier payout system
- Referral rewards program
- Governance token distribution
```

## API Integration

The dashboard uses sample data. To integrate real APIs:

### Cryptocurrency Data
- **CoinGecko API** (Free)
  ```
  https://api.coingecko.com/api/v3/simple/price
  ```

- **Binance API**
  ```
  https://api.binance.com/api/v3/ticker/price
  ```

### Payment Processing
- **Stripe** for credit card payments
- **Crypto payment processors** for direct crypto payments
- **Webhook integration** for transaction confirmations

## Security Features
- Non-custodial wallet design (users control private keys)
- Client-side key management
- No sensitive data stored on servers
- SSL/TLS encryption
- Rate limiting on API endpoints
- Admin wallet signature verification
- Multi-factor authentication (coming soon)

## Revenue Model
- **Subscription Tiers**: Recurring monthly revenue
- **Course Sales**: One-time course purchases
- **Premium Features**: In-app premium tools
- **Admin Wallet Fees**: Small transaction fees for wallet integration
- **Affiliate Programs**: Referral commissions

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the Mozilla Public License 2.0 - see the LICENSE file for details.

## Support
For issues, questions, or suggestions, please open an issue on GitHub.

## Roadmap
- [x] Basic landing page and pricing
- [x] Course marketplace
- [x] Admin wallet integration
- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] Real-time trading interface
- [ ] Price alerts and notifications
- [ ] Advanced portfolio analytics
- [ ] Mobile app (React Native)
- [ ] Advanced trading strategies
- [ ] Community features
- [ ] Social trading (copy trading)
- [ ] Backtesting tools
- [ ] Smart contract integration
- [ ] DAO governance tokens

---
**Built with ❤️ for crypto investors and traders**
