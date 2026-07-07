export interface Course {
  id: number
  title: string
  description: string
  level: string
  duration: string
  students: number
  rating: number
  price: number
  tier: 'free' | 'pro' | 'premium'
  instructor: string
  image: string
  content: string[]
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Crypto Fundamentals',
    description: 'Learn the basics of blockchain, Bitcoin, and Ethereum',
    level: 'Beginner',
    duration: '4 weeks',
    students: 2500,
    rating: 4.8,
    price: 0,
    tier: 'free',
    instructor: 'Sarah Chen',
    image: '🔷',
    content: [
      'Introduction to blockchain technology',
      'Understanding Bitcoin and mining',
      'Ethereum and smart contracts basics',
      'Cryptocurrency wallets and security',
      'Market fundamentals and economics',
    ],
  },
  {
    id: 2,
    title: 'Technical Analysis Mastery',
    description: 'Master chart patterns, indicators, and trading strategies',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 1800,
    rating: 4.9,
    price: 49,
    tier: 'pro',
    instructor: 'Mike Thompson',
    image: '📈',
    content: [
      'Candlestick patterns and chart reading',
      'Moving averages and trend analysis',
      'Support and resistance levels',
      'RSI, MACD, and other indicators',
      'Building a complete trading strategy',
    ],
  },
  {
    id: 3,
    title: 'DeFi & Smart Contracts',
    description: 'Understand decentralized finance and smart contract development',
    level: 'Advanced',
    duration: '8 weeks',
    students: 950,
    rating: 4.7,
    price: 99,
    tier: 'premium',
    instructor: 'Priya Nair',
    image: '⚙️',
    content: [
      'DeFi protocols and liquidity pools',
      'Token standards and smart contract architecture',
      'Common smart contract risks and mitigations',
      'Yield strategies and protocol analysis',
      'Building a DeFi evaluation checklist',
    ],
  },
  {
    id: 4,
    title: 'Portfolio Management Pro',
    description: 'Build and manage a professional cryptocurrency portfolio',
    level: 'Intermediate',
    duration: '5 weeks',
    students: 1200,
    rating: 4.8,
    price: 59,
    tier: 'pro',
    instructor: 'Daniel Brooks',
    image: '💼',
    content: [
      'Asset allocation across crypto sectors',
      'Rebalancing rules and risk budgeting',
      'Tracking performance versus benchmarks',
      'Position sizing for volatile assets',
      'Designing a repeatable portfolio review process',
    ],
  },
  {
    id: 5,
    title: 'Risk Management & Trading Psychology',
    description: 'Master the mental and strategic aspects of successful trading',
    level: 'All Levels',
    duration: '4 weeks',
    students: 3100,
    rating: 4.9,
    price: 39,
    tier: 'pro',
    instructor: 'Alicia Romero',
    image: '🧠',
    content: [
      'Identifying emotional trading patterns',
      'Setting stop-loss and take-profit rules',
      'Building a sustainable trading routine',
      'Journaling trades for better decision making',
      'Managing drawdowns with discipline',
    ],
  },
  {
    id: 6,
    title: 'Advanced Trading Algorithms',
    description: 'Create and deploy automated trading bots and algorithms',
    level: 'Expert',
    duration: '10 weeks',
    students: 450,
    rating: 4.95,
    price: 199,
    tier: 'premium',
    instructor: 'Noah Patel',
    image: '🤖',
    content: [
      'Strategy design for automated execution',
      'Backtesting datasets and signal validation',
      'Risk controls for algorithmic systems',
      'Monitoring bot performance in production',
      'Iterating on models without overfitting',
    ],
  },
]
