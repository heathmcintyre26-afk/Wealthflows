import { useState } from 'react'
import { Menu, X, Wallet, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-crypto-light border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="gradient-crypto p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl">Wealthflows</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
            )}
            <Link to="/courses" className="text-gray-300 hover:text-white transition">Courses</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="text-gray-300 hover:text-crypto-accent transition text-sm">
                  Admin
                </Link>
                <button type="button" onClick={logout} className="flex items-center space-x-1 text-gray-300 hover:text-white transition text-sm">
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm">
                Connect Wallet
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            <Link to="/" className="block py-2 text-gray-300 hover:text-white">Home</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="block py-2 text-gray-300 hover:text-white">Dashboard</Link>
            )}
            <Link to="/courses" className="block py-2 text-gray-300 hover:text-white">Courses</Link>
            <Link to="/pricing" className="block py-2 text-gray-300 hover:text-white">Pricing</Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin" className="block py-2 text-gray-300 hover:text-white">Admin</Link>
                <button onClick={logout} className="flex items-center space-x-2 py-2 text-gray-300 hover:text-white w-full">
                  <LogOut size={16} />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary block text-center mt-4 text-sm">
                Connect Wallet
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
