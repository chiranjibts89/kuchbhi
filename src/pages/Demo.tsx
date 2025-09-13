import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Monitor, Smartphone, Users, BookOpen, Target, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import VideoPlayer from '../components/VideoPlayer';

const Demo: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Engaging multimedia content with quizzes and assessments'
    },
    {
      icon: Target,
      title: 'Real-world Challenges',
      description: 'Hands-on environmental activities in your community'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges, points, and climb the leaderboards'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with eco-warriors across India'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091D23] to-[#774C3E]">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to="/"
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E1664C] rounded-lg px-2 py-1"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-white">Platform Demo</h1>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D991] to-[#F6B080]">
              PrismWorlds
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how our gamified environmental education platform transforms learning into an engaging, impactful experience.
          </p>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <GlassCard className="p-8">
            <div className="relative aspect-video bg-gradient-to-br from-[#091D23] to-[#774C3E] rounded-xl overflow-hidden">
              {/* Video Player */}
              <VideoPlayer
                src="/Prismworlds2.mp4"
                className="w-full h-full"
                autoPlay={false}
                muted={false}
              />
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">PrismWorlds Platform Demo</h3>
              <p className="text-white/70">
                Watch our comprehensive platform walkthrough showcasing all features, from student challenges to teacher analytics.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">What You'll See in the Demo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-[#F8D991]/20 to-[#F6B080]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#F8D991]/30">
                      <Icon className="h-8 w-8 text-[#F8D991]" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Device Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Works on All Devices</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#F6B080]/20 to-[#E1664C]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#F6B080]/30">
                  <Monitor className="h-10 w-10 text-[#F6B080]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Desktop & Laptop</h4>
                <p className="text-white/70">
                  Full-featured experience with advanced analytics and detailed progress tracking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#E1664C]/20 to-[#F58B60]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E1664C]/30">
                  <Smartphone className="h-10 w-10 text-[#E1664C]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Mobile & Tablet</h4>
                <p className="text-white/70">
                  Optimized mobile experience perfect for on-the-go learning and challenge completion.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Join thousands of students across India who are already making a positive impact on the environment through PrismWorlds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#F8D991]/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                <span>Start Learning</span>
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E1664C] focus:ring-offset-2 focus:ring-offset-transparent"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;