import { BookOpen, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: 'Crypto Fundamentals',
      description: 'Learn the basics of blockchain, Bitcoin, and Ethereum',
      level: 'Beginner',
      duration: '4 weeks',
      students: 2500,
      rating: 4.8,
      price: 0,
      image: '🔐',
      tier: 'free',
    },
    {
      id: 2,
      title: 'Technical Analysis Mastery',
      description: 'Master chart patterns, indicators, and trading strategies',
      level: 'Intermediate',
      duration: '6 weeks',
      students: 1800,
      rating: 4.9,
      price: 199,
      image: '📈',
      tier: 'pro',
    },
    {
      id: 3,
      title: 'DeFi & Smart Contracts',
      description: 'Understand decentralized finance and smart contract development',
      level: 'Advanced',
      duration: '8 weeks',
      students: 950,
      rating: 4.7,
      price: 499,
      image: '⚙️',
      tier: 'premium',
    },
    {
      id: 4,
      title: 'Portfolio Management Pro',
      description: 'Build and manage a professional cryptocurrency portfolio with advanced strategies',
      level: 'Intermediate',
      duration: '5 weeks',
      students: 1200,
      rating: 4.8,
      price: 299,
      image: '💼',
      tier: 'pro',
    },
    {
      id: 5,
      title: 'Risk Management & Trading Psychology',
      description: 'Master the mental and strategic aspects of successful trading',
      level: 'All Levels',
      duration: '4 weeks',
      students: 3100,
      rating: 4.9,
      price: 149,
      image: '🧠',
      tier: 'pro',
    },
    {
      id: 6,
      title: 'Advanced Trading Algorithms',
      description: 'Create and deploy automated trading bots and algorithms with machine learning',
      level: 'Expert',
      duration: '10 weeks',
      students: 450,
      rating: 4.95,
      price: 799,
      image: '🤖',
      tier: 'premium',
    },
    {
      id: 7,
      title: 'Elite Crypto Trading Bootcamp',
      description: 'Comprehensive 12-week intensive program covering all aspects of professional crypto trading',
      level: 'Expert',
      duration: '12 weeks',
      students: 280,
      rating: 4.97,
      price: 1200,
      image: '👑',
      tier: 'premium',
      badge: 'MOST POPULAR',
    },
    {
      id: 8,
      title: 'Institutional Trading Masterclass',
      description: 'Learn how institutions trade crypto at scale with advanced strategies and risk management',
      level: 'Expert',
      duration: '10 weeks',
      students: 150,
      rating: 4.99,
      price: 1500,
      image: '🏛️',
      tier: 'premium',
      badge: 'EXCLUSIVE',
    },
    {
      id: 9,
      title: 'Whale Trading Secrets',
      description: 'Discover the trading patterns and strategies used by crypto whales and institutions',
      level: 'Expert',
      duration: '8 weeks',
      students: 320,
      rating: 4.96,
      price: 999,
      image: '🐋',
      tier: 'premium',
    },
  ]

  const freeCourses = courses.filter(c => c.tier === 'free')
  const proCourses = courses.filter(c => c.tier === 'pro')
  const premiumCourses = courses.filter(c => c.tier === 'premium')

  const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <Link
      to={`/course/${course.id}`}
      className="group glass-effect p-6 hover:border-white/40 transition transform hover:scale-105"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl">{course.image}</span>
        <div className="flex flex-col gap-2 items-end">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            course.tier === 'free'
              ? 'bg-green-500/20 text-green-400'
              : course.tier === 'pro'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {course.tier.toUpperCase()}
          </span>
          {course.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400">
              {course.badge}
            </span>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-crypto-accent transition">
        {course.title}
      </h3>
      <p className="text-gray-400 text-sm mb-4">{course.description}</p>

      {/* Meta Info */}
      <div className="space-y-2 mb-6 text-sm text-gray-300">
        <div className="flex items-center space-x-2">
          <BookOpen size={16} />
          <span>{course.level}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star size={16} className="text-yellow-400" />
          <span>{course.rating} ({course.students} students)</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <span className="font-bold text-lg">
          {course.price === 0 ? 'Free' : `$${course.price}`}
        </span>
        <span className="text-gray-400 text-sm">{course.duration}</span>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn Crypto Trading</h1>
          <p className="text-xl text-gray-300">Master the skills to trade confidently in any market</p>
        </div>

        {/* Free Courses */}
        {freeCourses.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-green-400">Free Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Pro Courses */}
        {proCourses.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">Pro Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Premium Courses */}
        {premiumCourses.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">Premium Courses</h2>
            <p className="text-gray-300 mb-8">Advanced and exclusive courses for serious traders. Premium bootcamps up to $1500</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Crypto?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with free courses and unlock premium content with Pro and Premium memberships. Some advanced bootcamps and masterclasses cost up to $1500.
          </p>
          <Link to="/pricing" className="btn-primary text-lg">
            View Pricing Plans
          </Link>
        </div>
      </div>
    </div>
  )
}
