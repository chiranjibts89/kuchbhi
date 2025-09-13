import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckCircle, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStudent } from '../contexts/StudentContext';

const Lessons: React.FC = () => {
  const { studentProfile } = useAuth();
  const { lessons, completedLessons, loading } = useStudent();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#F8D991] border-opacity-50"></div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Environmental Education</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Discover the fascinating world of environmental science through interactive lessons designed specifically for Indian students.
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
          <div className="flex items-center space-x-2 text-[#F8D991]">
            <Award className="h-5 w-5" />
            <span className="font-semibold">
              {completedLessons.length} / {lessons.length} Completed
            </span>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-[#F6B080] to-[#F8D991] rounded-full h-3"
            initial={{ width: 0 }}
            animate={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-white/70 text-sm mt-2">
          Complete all lessons to become an Environmental Expert!
        </p>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          const completed = isCompleted(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:bg-white/15 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={lesson.image_url || 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={lesson.title}
                  className="w-full h-48 object-cover"
                />
                {completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{lesson.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-white/60">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{lesson.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#F8D991]">
                    <Award className="h-4 w-4" />
                    <span className="text-sm font-semibold">{lesson.points} points</span>
                  </div>
                </div>
                
                <Link
                  to={`/lessons/${lesson.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    completed
                      ? 'bg-[#F6B080]/20 text-[#F6B080] hover:bg-[#F6B080]/30 border border-[#F6B080]/30'
                      : 'bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] hover:shadow-lg hover:shadow-[#F8D991]/25'
                  }`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {completed ? 'Review Lesson' : 'Start Lesson'}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Learning Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Climate Change', 'Waste Management', 'Water Conservation', 'Biodiversity'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-2xl mb-2">
                {category === 'Climate Change' && '🌍'}
                {category === 'Waste Management' && '♻️'}
                {category === 'Water Conservation' && '💧'}
                {category === 'Biodiversity' && '🦋'}
              </div>
              <h3 className="font-semibold text-white">{category}</h3>
              <p className="text-sm text-white/70">
                {lessons.filter(lesson => lesson.category.includes(category.split(' ')[0])).length} lessons
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Lessons;