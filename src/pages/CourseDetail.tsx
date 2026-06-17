import { useParams, Link } from 'react-router-dom'
import { BookOpen, Clock, Users, Star, ArrowLeft, Lock, Trophy } from 'lucide-react'

export default function CourseDetail() {
  const { id } = useParams()

  const courseData: Record<string, any> = {
    '1': {
      title: 'Crypto Fundamentals',
      description: 'Learn the basics of blockchain, Bitcoin, and Ethereum',
      level: 'Beginner',
      duration: '4 weeks',
      students: 2500,
      rating: 4.8,
      price: 0,
      tier: 'free',
      instructor: 'Sarah Chen',
      image: '🔐',
      content: [
        'Introduction to blockchain technology',
        'Understanding Bitcoin and mining',
        'Ethereum and smart contracts basics',
        'Cryptocurrency wallets and security',
        'Market fundamentals and economics',
      ],
    },
    '7': {
      title: 'Elite Crypto Trading Bootcamp',
      description: 'Comprehensive 12-week intensive program covering all aspects of professional crypto trading',
      level: 'Expert',
      duration: '12 weeks',
      students: 280,
      rating: 4.97,
      price: 1200,
      tier: 'premium',
      instructor: 'Marcus Sterling',
      image: '👑',
      badge: 'MOST POPULAR',
      certification: true,
      content: [
        'Advanced technical analysis & chart patterns',
        'Fundamental analysis for crypto assets',
        'Risk management and position sizing',
        'Trading psychology and discipline',
        'Building your trading strategy',
        'Market microstructure & order flow',
        'Advanced derivatives trading',
        'Portfolio construction & rebalancing',
        'Algorithmic trading basics',
        'Real-time trading simulation',
        'Live trading with mentor guidance',
        'Professional trading setup',
      ],
    },
    '8': {
      title: 'Institutional Trading Masterclass',
      description: 'Learn how institutions trade crypto at scale with advanced strategies and risk management',
      level: 'Expert',
      duration: '10 weeks',
      students: 150,
      rating: 4.99,
      price: 1500,
      tier: 'premium',
      instructor: 'James Mitchell (Former JP Morgan)',
      image: '🏛️',
      badge: 'EXCLUSIVE',
      certification: true,
      content: [
        'Institutional trading operations',
        'Large volume execution strategies',
        'Market making and liquidity',
        'Arbitrage opportunities & execution',
        'OTC trading and block deals',
        'Regulatory compliance & reporting',
        'Risk frameworks & compliance',
        'Building trading infrastructure',
        'Quantitative analysis & modeling',
        'High-frequency trading concepts',
      ],
    },
    '9': {
      title: 'Whale Trading Secrets',
      description: 'Discover the trading patterns and strategies used by crypto whales and institutions',
      level: 'Expert',
      duration: '8 weeks',
      students: 320,
      rating: 4.96,
      price: 999,
      tier: 'premium',
      instructor: 'Alex Rivera',
      image: '🐋',
      certification: true,
      content: [
        'Identifying whale transactions & patterns',
        'On-chain analysis techniques',
        'Large accumulation patterns',
        'Pump & dump detection',
        'Smart contract interaction analysis',
        'Exchange flow analysis',
        'Whale wallet tracking',
        'Network effects & game theory',
      ],
    },
  }

  const course = courseData[id || '1']

  if (!course) {
    return (
      <div className="min-h-screen bg-crypto-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/courses" className="inline-flex items-center space-x-2 text-crypto-accent hover:text-blue-400 mb-8">
          <ArrowLeft size={20} />
          <span>Back to Courses</span>
        </Link>

        {/* Course Header */}
        <div className="glass-effect p-8 mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-5xl">{course.image}</span>
              <h1 className="text-4xl font-bold mt-4 mb-2">{course.title}</h1>
              <p className="text-xl text-gray-300">{course.description}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className={`px-4 py-2 rounded-lg font-bold h-fit ${
                course.tier === 'free'
                  ? 'bg-green-500/20 text-green-400'
                  : course.tier === 'pro'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {course.tier.toUpperCase()}
              </span>
              {course.badge && (
                <span className="px-4 py-2 rounded-lg font-bold bg-purple-500/20 text-purple-400">
                  {course.badge}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div>
              <p className="text-gray-400 text-sm mb-1">Instructor</p>
              <p className="font-semibold">{course.instructor}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Level</p>
              <p className="font-semibold">{course.level}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Duration</p>
              <p className="font-semibold flex items-center space-x-1">
                <Clock size={16} />
                <span>{course.duration}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Rating</p>
              <p className="font-semibold flex items-center space-x-1">
                <Star size={16} className="text-yellow-400" />
                <span>{course.rating}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="glass-effect p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <ul className="space-y-4">
                {course.content.map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-crypto-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Curriculum */}
            <div className="glass-effect p-8">
              <h2 className="text-2xl font-bold mb-6">Course Structure</h2>
              <div className="space-y-4">
                {course.content.slice(0, Math.ceil(course.content.length / 2)).map((_, i) => (
                  <div key={i} className="border-b border-white/10 pb-4 last:border-0">
                    <h3 className="font-semibold mb-2">Week {i + 1}: {course.title.split(' ')[0]} Module</h3>
                    <ul className="text-sm text-gray-400 space-y-1 ml-4">
                      <li>• Lesson 1: Core Concepts</li>
                      <li>• Lesson 2: Advanced Strategies</li>
                      <li>• Lesson 3: Practical Trading</li>
                      <li>• Live Q&A Session</li>
                      <li>• Assignment & Assessment</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Enrollment Card */}
            <div className="glass-effect p-8 sticky top-20">
              <div className="text-4xl font-bold mb-2">
                {course.price === 0 ? 'Free' : `$${course.price.toLocaleString()}`}
              </div>
              <p className="text-gray-400 text-sm mb-6">One-time payment</p>

              <button className={`w-full mb-4 py-3 rounded-lg font-semibold transition ${
                course.price === 0 ? 'btn-primary' : 'btn-premium'
              }`}>
                {course.price === 0 ? 'Enroll Now' : 'Enroll & Pay'}
              </button>

              <button className="btn-secondary w-full mb-6">
                Add to Wishlist
              </button>

              {/* Features */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                {course.certification && (
                  <div className="flex items-center space-x-2 text-crypto-accent">
                    <Trophy size={18} />
                    <span className="text-sm">Certificate upon completion</span>
                  </div>
                )}
                {course.price >= 999 && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Lock size={18} />
                    <span className="text-sm">Exclusive content</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users size={18} />
                  <span className="text-sm">{course.students} students enrolled</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Star size={18} className="text-yellow-400" />
                  <span className="text-sm">{course.rating} rating</span>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm font-semibold mb-1">✓ 30-Day Money Back Guarantee</p>
                <p className="text-gray-400 text-xs">Not satisfied? Full refund, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
