import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Target, Droplets, TreePine, Zap, Award } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

const Analytics: React.FC = () => {
  const { currentStudent, allChallenges } = useStudent();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Generate mock analytics data
  const generateProgressData = () => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : selectedPeriod === '90d' ? 90 : 365;
    const data = [];
    let cumulativePoints = Math.max(0, currentStudent.ecoPoints - days * 10);
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const pointsGained = Math.floor(Math.random() * 20) + 5;
      cumulativePoints += pointsGained;
      
      data.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        points: cumulativePoints,
        dailyPoints: pointsGained,
        carbonSaved: pointsGained * 0.5,
        waterSaved: pointsGained * 10
      });
    }
    return data;
  };

  const generateCategoryData = () => {
    const categories = ['conservation', 'waste', 'water', 'energy', 'biodiversity', 'climate'];
    return categories.map(category => {
      const categoryPoints = allChallenges
        .filter(challenge => 
          challenge.category === category && 
          currentStudent.completedChallenges.includes(challenge.id)
        )
        .reduce((sum, challenge) => sum + challenge.points, 0);
      
      return {
        name: category.charAt(0).toUpperCase() + category.slice(1),
        points: categoryPoints,
        challenges: allChallenges.filter(c => c.category === category && currentStudent.completedChallenges.includes(c.id)).length
      };
    });
  };

  const generateImpactData = () => {
    return [
      { name: 'Trees Planted', value: Math.floor(currentStudent.totalImpactScore / 50), icon: TreePine, color: '#22c55e' },
      { name: 'Liters Water Saved', value: Math.floor(currentStudent.totalImpactScore * 10), icon: Droplets, color: '#3b82f6' },
      { name: 'CO₂ Reduced (kg)', value: Math.floor(currentStudent.totalImpactScore * 2), icon: Zap, color: '#f59e0b' },
    ];
  };

  const progressData = generateProgressData();
  const categoryData = generateCategoryData();
  const impactData = generateImpactData();

  const totalCarbonSaved = progressData.reduce((sum, day) => sum + day.carbonSaved, 0);
  const totalWaterSaved = progressData.reduce((sum, day) => sum + day.waterSaved, 0);

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 Impact Analytics</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Track your environmental impact and see how your actions are making a difference for our planet.
        </p>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Analytics Period</h2>
          <div className="flex space-x-2">
            {(['7d', '30d', '90d', '1y'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === '7d' ? 'Last 7 days' :
                 period === '30d' ? 'Last 30 days' :
                 period === '90d' ? 'Last 3 months' : 'Last year'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Eco Points</p>
              <p className="text-3xl font-bold text-green-600">{currentStudent.ecoPoints.toLocaleString()}</p>
            </div>
            <Award className="h-12 w-12 text-green-500 opacity-80" />
          </div>
          <div className="mt-2 text-sm text-green-600">
            <TrendingUp className="h-4 w-4 inline mr-1" />
            +{progressData[progressData.length - 1]?.dailyPoints || 0} today
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Carbon Footprint Reduced</p>
              <p className="text-3xl font-bold text-blue-600">{totalCarbonSaved.toFixed(1)} kg</p>
            </div>
            <Zap className="h-12 w-12 text-blue-500 opacity-80" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Equivalent to {Math.floor(totalCarbonSaved / 2.3)} km by car
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Water Conserved</p>
              <p className="text-3xl font-bold text-cyan-600">{totalWaterSaved.toLocaleString()} L</p>
            </div>
            <Droplets className="h-12 w-12 text-cyan-500 opacity-80" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            That's {Math.floor(totalWaterSaved / 200)} bathtubs full!
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Current Streak</p>
              <p className="text-3xl font-bold text-orange-600">{currentStudent.streak}</p>
            </div>
            <Calendar className="h-12 w-12 text-orange-500 opacity-80" />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Keep it up! 🔥
          </div>
        </div>
      </motion.div>

      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Eco Points Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="points"
              stroke="#22c55e"
              fill="url(#colorPoints)"
            />
            <defs>
              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Impact Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Environmental Impact</h3>
          <div className="space-y-6">
            {impactData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">{item.name}</span>
                      <span className="text-2xl font-bold" style={{ color: item.color }}>
                        {item.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Points by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="points"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Daily Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData.slice(-14)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="dailyPoints" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Achievements Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Achievements</h3>
        <div className="space-y-4">
          {currentStudent.earnedBadges.slice(-5).reverse().map((badge, index) => (
            <motion.div
              key={badge.badgeId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Badge Earned: {badge.badgeId}</p>
                <p className="text-gray-600 text-sm">
                  {new Date(badge.dateEarned).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;