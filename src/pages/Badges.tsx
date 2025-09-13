import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, Star, Calendar, CheckCircle } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

const Badges: React.FC = () => {
  const { allBadges, currentStudent } = useStudent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const categories = ['all', ...new Set(allBadges.map(badge => badge.category))];

  const filteredBadges = allBadges.filter(badge => 
    selectedCategory === 'all' || badge.category === selectedCategory
  );

  const earnedBadges = currentStudent.earnedBadges.map(eb => 
    allBadges.find(b => b.id === eb.badgeId)
  ).filter(Boolean);

  const isEarned = (badgeId: string) => 
    currentStudent.earnedBadges.some(eb => eb.badgeId === badgeId);

  const getEarnedDate = (badgeId: string) => {
    const earned = currentStudent.earnedBadges.find(eb => eb.badgeId === badgeId);
    return earned ? new Date(earned.dateEarned) : null;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-600 to-amber-700';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const selectedBadgeData = selectedBadge ? allBadges.find(b => b.id === selectedBadge) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">🏅 Achievement Badges</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Collect badges by completing challenges and lessons. Show off your environmental achievements!
        </p>
      </motion.div>

      {/* Progress Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <Award className="h-8 w-8 text-[#F8D991] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{earnedBadges.length}</div>
          <div className="text-white/70 text-sm">Earned Badges</div>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <Lock className="h-8 w-8 text-white/50 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{allBadges.length - earnedBadges.length}</div>
          <div className="text-white/70 text-sm">Locked Badges</div>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <Star className="h-8 w-8 text-[#F58B60] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {Math.round((earnedBadges.length / allBadges.length) * 100)}%
          </div>
          <div className="text-white/70 text-sm">Collection Progress</div>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <div className="text-2xl font-bold text-white">
            {earnedBadges.filter(b => b?.tier === 'Gold' || b?.tier === 'Platinum').length}
          </div>
          <div className="text-white/70 text-sm">Rare Badges</div>
        </div>
      </motion.div>

      {/* Collection Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Collection Progress</h2>
          <span className="text-[#F8D991] font-semibold">
            {earnedBadges.length} / {allBadges.length} badges
          </span>
        </div>
        <div className="bg-white/20 rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-[#F6B080] to-[#F8D991] rounded-full h-4"
            initial={{ width: 0 }}
            animate={{ width: `${(earnedBadges.length / allBadges.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#E1664C] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recently Earned Badges */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">🎉 Recently Earned</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {earnedBadges.slice(-3).reverse().map((badge, index) => badge && (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-3 bg-[#F6B080]/20 border border-[#F6B080]/30 rounded-lg p-3"
              >
                <div className="relative">
                  <img
                    src={badge.imageUrl}
                    alt={badge.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{badge.name}</h4>
                  <p className="text-[#F6B080] text-sm">Just earned!</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBadges.map((badge, index) => {
          const earned = isEarned(badge.id);
          const earnedDate = getEarnedDate(badge.id);
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedBadge(badge.id)}
              className={`relative cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                earned 
                  ? 'backdrop-blur-md bg-white/10 border-2 border-[#F6B080]/30 shadow-xl hover:shadow-2xl hover:bg-white/15' 
                  : 'backdrop-blur-md bg-white/5 border-2 border-white/10 opacity-75 hover:bg-white/10'
              }`}
            >
              {/* Badge Image */}
              <div className="relative mx-auto w-20 h-20 mb-3">
                <img
                  src={badge.imageUrl}
                  alt={badge.name}
                  className={`w-full h-full rounded-full ${earned ? '' : 'grayscale'}`}
                />
                {!earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                )}
                {earned && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* Badge Info */}
              <div className="text-center">
                <h3 className={`font-bold text-sm mb-1 ${earned ? 'text-white' : 'text-white/50'}`}>
                  {badge.name}
                </h3>
                
                {/* Tier Badge */}
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTierColor(badge.tier)} text-white mb-2`}>
                  {badge.tier}
                </div>
                
                {/* Rarity */}
                <div className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)} mb-2`}>
                  {badge.rarity}
                </div>

                {earned && earnedDate && (
                  <div className="text-xs text-green-600">
                    Earned {earnedDate.toLocaleDateString()}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && selectedBadgeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="text-center">
                {/* Badge Image */}
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <img
                    src={selectedBadgeData.imageUrl}
                    alt={selectedBadgeData.name}
                    className={`w-full h-full rounded-full ${isEarned(selectedBadgeData.id) ? '' : 'grayscale'}`}
                  />
                  {isEarned(selectedBadgeData.id) && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Badge Details */}
                <h2 className="text-2xl font-bold text-white mb-2">{selectedBadgeData.name}</h2>
                
                <div className="flex justify-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getTierColor(selectedBadgeData.tier)} text-white`}>
                    {selectedBadgeData.tier}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full ${getRarityColor(selectedBadgeData.rarity)}`}>
                    {selectedBadgeData.rarity}
                  </span>
                </div>

                <p className="text-white/70 mb-4">{selectedBadgeData.description}</p>

                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">How to earn:</h4>
                  <p className="text-white/70 text-sm">{selectedBadgeData.criteria}</p>
                </div>

                {isEarned(selectedBadgeData.id) && getEarnedDate(selectedBadgeData.id) && (
                  <div className="bg-[#F6B080]/20 border border-[#F6B080]/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center space-x-2 text-[#F6B080]">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Earned on {getEarnedDate(selectedBadgeData.id)!.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full px-6 py-2 bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] rounded-lg hover:shadow-lg hover:shadow-[#F8D991]/25 font-medium transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Badges;