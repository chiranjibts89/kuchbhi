import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, MapPin, Calendar, Upload, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudent } from '../contexts/StudentContext';

const Challenges: React.FC = () => {
  const { completeChallenge } = useAuth();
  const { challenges, completedChallenges, loading } = useStudent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#F8D991] border-opacity-50"></div>
      </div>
    );
  }

  const categories = ['all', 'conservation', 'waste', 'water', 'energy', 'biodiversity', 'climate'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = challenges.filter(challenge => {
    const categoryMatch = selectedCategory === 'all' || challenge.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'conservation': return 'bg-green-100 text-green-800';
      case 'waste': return 'bg-purple-100 text-purple-800';
      case 'water': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-yellow-100 text-yellow-800';
      case 'biodiversity': return 'bg-pink-100 text-pink-800';
      case 'climate': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCompleteChallenge = (challengeId: string) => {
    completeChallenge(challengeId, []);
    setShowUploadModal(null);
  };

  const isCompleted = (challengeId: string) => completedChallenges.includes(challengeId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Environmental Challenges</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Take action in the real world! Complete these hands-on challenges to make a positive environmental impact in your community.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <Target className="h-8 w-8 text-[#F8D991] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{challenges.length}</div>
          <div className="text-white/70 text-sm">Total Challenges</div>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <CheckCircle className="h-8 w-8 text-[#F6B080] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{completedChallenges.length}</div>
          <div className="text-white/70 text-sm">Completed</div>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <Star className="h-8 w-8 text-[#F58B60] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {challenges
              .filter(c => completedChallenges.includes(c.id))
              .reduce((sum, c) => sum + c.points, 0)}
          </div>
          <div className="text-white/70 text-sm">Points Earned</div>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6 text-center">
          <div className="text-2xl font-bold text-white">
            {Math.round((completedChallenges.length / challenges.length) * 100)}%
          </div>
          <div className="text-white/70 text-sm">Completion Rate</div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
      >
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-[#E1664C] focus:border-[#E1664C] backdrop-blur-sm"
            >
              <option value="all" className="bg-[#091D23] text-white">All Categories</option>
              <option value="conservation" className="bg-[#091D23] text-white">Conservation</option>
              <option value="waste" className="bg-[#091D23] text-white">Waste Management</option>
              <option value="water" className="bg-[#091D23] text-white">Water Conservation</option>
              <option value="energy" className="bg-[#091D23] text-white">Energy</option>
              <option value="biodiversity" className="bg-[#091D23] text-white">Biodiversity</option>
              <option value="climate" className="bg-[#091D23] text-white">Climate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-[#E1664C] focus:border-[#E1664C] backdrop-blur-sm"
            >
              <option value="all" className="bg-[#091D23] text-white">All Difficulties</option>
              <option value="Easy" className="bg-[#091D23] text-white">Easy</option>
              <option value="Medium" className="bg-[#091D23] text-white">Medium</option>
              <option value="Hard" className="bg-[#091D23] text-white">Hard</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge, index) => {
          const completed = isCompleted(challenge.id);
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:bg-white/15 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={challenge.image_url || 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
                {completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(challenge.category)}`}>
                    {challenge.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{challenge.description}</p>

                <div className="space-y-2 mb-4 text-sm text-white/60">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{challenge.estimated_time}</span>
                  </div>
                  {challenge.state && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{challenge.state}</span>
                    </div>
                  )}
                  {challenge.season && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{challenge.season} season</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-[#F8D991]">
                    <Star className="h-4 w-4" />
                    <span className="font-semibold">{challenge.points} points</span>
                  </div>
                </div>

                <button
                  onClick={() => completed ? null : setShowUploadModal(challenge.id)}
                  disabled={completed}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    completed
                      ? 'bg-[#F6B080]/20 text-[#F6B080] cursor-not-allowed border border-[#F6B080]/30'
                      : 'bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] hover:shadow-lg hover:shadow-[#F8D991]/25'
                  }`}
                >
                  {completed ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Start Challenge</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {(() => {
              const challenge = challenges.find(c => c.id === showUploadModal)!;
              return (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{challenge.title}</h3>
                  
                  <img
                    src={challenge.image_url || 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={challenge.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-white/70">
                      {challenge.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-white/70">
                      {challenge.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center mb-6">
                    <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Upload Challenge Evidence</h4>
                    <p className="text-white/70 mb-4">
                      Take photos or videos documenting your completion of this challenge.
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-2 bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] rounded-lg cursor-pointer hover:shadow-lg font-semibold"
                    >
                      Choose Files
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg"
                    >
                      Mark as Completed (+{challenge.points} points)
                    </button>
                    <button
                      onClick={() => setShowUploadModal(null)}
                      className="flex-1 bg-white/20 border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/30"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Challenges;