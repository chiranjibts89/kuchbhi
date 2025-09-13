import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Book, Target, Trophy, Award, BarChart, User, ShoppingBag } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Lessons', href: '/lessons', icon: Book },
    { name: 'Challenges', href: '/challenges', icon: Target },
    { name: 'Leaderboards', href: '/leaderboards', icon: Trophy },
    { name: 'Badges', href: '/badges', icon: Award },
    { name: 'Points Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-[#091D23] to-[#774C3E] backdrop-blur-md border-l border-white/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white/70 hover:text-[#E1664C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-[#F8D991]/20 text-[#F8D991] border border-[#F8D991]/30'
                          : 'text-white/80 hover:text-[#E1664C] hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;