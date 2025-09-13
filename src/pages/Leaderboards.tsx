import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, Users, Target, Award, Calendar } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import GlassCard from '../components/GlassCard';

interface LeaderboardStudent {
  id: string;
  name: string;
  avatar: string;
  ecoPoints: number;
  level: number;
  streak: number;
  completedChallenges: number;
  school: string;
  state: string;
  trend: 'up' | 'down' | 'same';
  rankChange: number;
}

const Leaderboards: React.FC = () => {
  const { currentStudent } = useStudent();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<'overall' | 'challenges' | 'lessons' | 'impact'>('overall');

  // Mock leaderboard data
  const generateLeaderboardData = (): LeaderboardStudent[] => {
    const mockStudents: LeaderboardStudent[] = [
      {
        id: '1',
        name: 'Arjun Sharma',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        ecoPoints: 2450,
        level: 12,
        streak: 28,
        completedChallenges: 15,
        school: 'Green Valley School',
        state: 'Maharashtra',
        trend: 'up',
        rankChange: 2
      },
      {
        id: '2',
        name: 'Priya Patel',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        ecoPoints: 2380,
        level: 11,
        streak: 25,
        completedChallenges: 14,
        school: 'Eco International',
        state: 'Gujarat',
        trend: 'down',
        rankChange: -1
      },
      {
        id: '3',
        name: 'Rahul Kumar',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        ecoPoints: 2320,
        level: 11,
        streak: 22,
        completedChallenges: 13,
        school: 'Nature Academy',
        state: 'Karnataka',
        trend: 'up',
        rankChange: 1
      },
      {
        id: '4',
        name: 'Sneha Reddy',
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        ecoPoints: 2180,
        level: 10,
        streak: 20,
        completedChallenges: 12,
        school: 'Earth Sciences School',
        state: 'Telangana',
        trend: 'same',
        rankChange: 0
      },
      {
        id: '5',
        name: 'Vikram Singh',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        ecoPoints: 2050,
        level: 10,
        streak: 18,
        completedChallenges: 11,
        school: 'Green Future Academy',
        state: 'Rajasthan',
        trend: 'up',
        rankChange: 3
      }
    ];

    // Add current student if not in top 5
    const currentStudentInTop5 = mockStudents.find(s => s.id === currentStudent.id);
    if (!currentStudentInTop5) {
      mockStudents.push({
        id: currentStudent.id,
        name: currentStudent.name,
        avatar: currentStudent.avatar,
        ecoPoints: currentStudent.ecoPoints,
        level: currentStudent.level,
        streak: currentStudent.streak,
        completedChallenges: currentStudent.completedChallenges.length,
        school: currentStudent.school,
        state: currentStudent.state,
        trend: 'up',
        rankChange: 2
      });
    }

    return mockStudents.sort((a, b) => b.ecoPoints - a.ecoPoints);
  };

  const leaderboardData = generateLeaderboardData();
  const currentStudentRank = leaderboardData.findIndex(s => s.id === currentStudent.id) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-[#F8D991]" />;
      case 2:
        return <Medal className="h-6 w-6 text-[#F6B080]" />;
      case 3:
        return <Trophy className="h-6 w-6 text-[#F58B60]" />;
      default:
        return <span className="text-lg font-bold text-white">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'same', change: number) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-[#F6B080]" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-[#E1664C]" />;
      default:
        return <Minus className="h-4 w-4 text-white/50" />;
    }
  };

  const getRankBackground = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'bg-[#E1664C]/20 border-[#E1664C]/30 border-2';
    }
    switch (rank) {
      case 1:
        return 'bg-[#F8D991]/20 border-[#F8D991]/30 border';
      case 2:
        return 'bg-[#F6B080]/20 border-[#F6B080]/30 border';
      case 3:
        return 'bg-[#F58B60]/20 border-[#F58B60]/30 border';
      default:
        return 'bg-white/10 border-white/20 border';
    }
  };

  const periods = [
    { id: 'weekly', name: 'This Week' },
    { id: 'monthly', name: 'This Month' },
    { id: 'allTime', name: 'All Time' }
  ];

  const categories = [
    { id: 'overall', name: 'Overall Points', icon: Trophy },
    { id: 'challenges', name: 'Challenges', icon: Target },
    { id: 'lessons', name: 'Lessons', icon: Award },
    { id: 'impact', name: 'Impact Score', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#F8D991] mb-4">🏆 Leaderboards</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          See how you rank against eco-warriors across India! Compete, learn, and make a difference together.
        </p>
      </motion.div>

      {/* Current User Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-[#E1664C]/20 rounded-full border-2 border-[#E1664C]/30">
                {getRankIcon(currentStudentRank)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F8D991]">Your Current Rank</h3>
                <p className="text-white/70">
                  {currentStudentRank === 1 ? 'You\'re leading the pack!' : 
                   currentStudentRank <= 3 ? 'Amazing work! You\'re in the top 3!' :
                   currentStudentRank <= 10 ? 'Great job! You\'re in the top 10!' :
                   'Keep going! Every point counts!'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#F8D991]">#{currentStudentRank}</div>
              <div className="text-[#F6B080]">{currentStudent.ecoPoints} points</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Period Filter */}
            <div className="flex-1">
              <h4 className="text-[#F8D991] font-semibold mb-3 flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Time Period</span>
              </h4>
              <div className="flex space-x-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] ${
                      selectedPeriod === period.id
                        ? 'bg-[#E1664C] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <h4 className="text-[#F8D991] font-semibold mb-3">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as any)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] ${
                        selectedCategory === category.id
                          ? 'bg-[#E1664C] text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-8">
          <h3 className="text-2xl font-bold text-[#F8D991] mb-8 text-center">🥇 Top Performers</h3>
          
          <div className="flex justify-center items-end space-x-4 mb-8">
            {/* 2nd Place */}
            {leaderboardData[1] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-[#F6B080]/20 border-2 border-[#F6B080]/30 rounded-xl p-4 h-32 flex flex-col justify-end">
                  <img
                    src={leaderboardData[1].avatar}
                    alt={leaderboardData[1].name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#F6B080]"
                  />
                  <Medal className="h-6 w-6 text-[#F6B080] mx-auto mb-1" />
                  <div className="text-sm font-bold text-[#F6B080]">2nd</div>
                </div>
                <div className="mt-3">
                  <div className="font-bold text-white text-sm">{leaderboardData[1].name}</div>
                  <div className="text-[#F6B080] text-xs">{leaderboardData[1].ecoPoints} pts</div>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {leaderboardData[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="bg-[#F8D991]/20 border-2 border-[#F8D991]/30 rounded-xl p-4 h-40 flex flex-col justify-end">
                  <img
                    src={leaderboardData[0].avatar}
                    alt={leaderboardData[0].name}
                    className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-[#F8D991]"
                  />
                  <Crown className="h-8 w-8 text-[#F8D991] mx-auto mb-1" />
                  <div className="text-lg font-bold text-[#F8D991]">1st</div>
                </div>
                <div className="mt-3">
                  <div className="font-bold text-white">{leaderboardData[0].name}</div>
                  <div className="text-[#F8D991]">{leaderboardData[0].ecoPoints} pts</div>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {leaderboardData[2] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="bg-[#F58B60]/20 border-2 border-[#F58B60]/30 rounded-xl p-4 h-28 flex flex-col justify-end">
                  <img
                    src={leaderboardData[2].avatar}
                    alt={leaderboardData[2].name}
                    className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-[#F58B60]"
                  />
                  <Trophy className="h-5 w-5 text-[#F58B60] mx-auto mb-1" />
                  <div className="text-sm font-bold text-[#F58B60]">3rd</div>
                </div>
                <div className="mt-3">
                  <div className="font-bold text-white text-sm">{leaderboardData[2].name}</div>
                  <div className="text-[#F58B60] text-xs">{leaderboardData[2].ecoPoints} pts</div>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Full Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold text-[#F8D991] mb-6">📊 Full Rankings</h3>
          
          <div className="space-y-3">
            {leaderboardData.map((student, index) => {
              const rank = index + 1;
              const isCurrentUser = student.id === currentStudent.id;
              
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`p-4 rounded-xl backdrop-blur-sm ${getRankBackground(rank, isCurrentUser)} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar and Info */}
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className={`w-12 h-12 rounded-full border-2 ${
                            rank === 1 ? 'border-[#F8D991]' :
                            rank === 2 ? 'border-[#F6B080]' :
                            rank === 3 ? 'border-[#F58B60]' :
                            'border-white/30'
                          }`}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-bold ${isCurrentUser ? 'text-[#E1664C]' : 'text-white'}`}>
                              {student.name}
                              {isCurrentUser && <span className="text-xs ml-1">(You)</span>}
                            </h4>
                            {getTrendIcon(student.trend, student.rankChange)}
                          </div>
                          <div className="text-sm text-white/70">
                            {student.school} • {student.state}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <div className={`text-lg font-bold ${
                          rank === 1 ? 'text-[#F8D991]' :
                          rank === 2 ? 'text-[#F6B080]' :
                          rank === 3 ? 'text-[#F58B60]' :
                          'text-white'
                        }`}>
                          {student.ecoPoints.toLocaleString()}
                        </div>
                        <div className="text-xs text-white/70">Eco Points</div>
                      </div>
                      
                      <div className="hidden md:block">
                        <div className="text-sm font-semibold text-[#F6B080]">L{student.level}</div>
                        <div className="text-xs text-white/70">Level</div>
                      </div>
                      
                      <div className="hidden md:block">
                        <div className="text-sm font-semibold text-[#E1664C]">{student.streak}</div>
                        <div className="text-xs text-white/70">Streak</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <GlassCard className="p-6 text-center">
          <Users className="h-8 w-8 text-[#F8D991] mx-auto mb-3" />
          <div className="text-2xl font-bold text-[#F8D991]">{leaderboardData.length}</div>
          <div className="text-white/70 text-sm">Active Participants</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <Trophy className="h-8 w-8 text-[#F6B080] mx-auto mb-3" />
          <div className="text-2xl font-bold text-[#F6B080]">
            {Math.round(leaderboardData.reduce((sum, s) => sum + s.ecoPoints, 0) / leaderboardData.length)}
          </div>
          <div className="text-white/70 text-sm">Average Points</div>
        </GlassCard>
        
        <GlassCard className="p-6 text-center">
          <Target className="h-8 w-8 text-[#F58B60] mx-auto mb-3" />
          <div className="text-2xl font-bold text-[#F58B60]">
            {leaderboardData.reduce((sum, s) => sum + s.completedChallenges, 0)}
          </div>
          <div className="text-white/70 text-sm">Total Challenges</div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Leaderboards;