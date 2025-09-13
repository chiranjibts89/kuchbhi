export interface Student {
  id: string;
  name: string;
  grade: string;
  school: string;
  state: string;
  ecoPoints: number;
  level: number;
  streak: number;
  completedLessons: string[];
  completedChallenges: string[];
  earnedBadges: EarnedBadge[];
  totalImpactScore: number;
  weeklyGoal: number;
  monthlyGoal: number;
  avatar: string;
  joinDate: string;
}

export interface EarnedBadge {
  badgeId: string;
  dateEarned: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  content: LessonContent;
  quiz: Quiz;
  imageUrl: string;
  points: number;
}

export interface LessonContent {
  sections: ContentSection[];
}

export interface ContentSection {
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface Quiz {
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'conservation' | 'waste' | 'water' | 'energy' | 'biodiversity' | 'climate';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimatedTime: string;
  requirements: string[];
  state?: string;
  season?: string;
  imageUrl: string;
  instructions: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  criteria: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  category: string;
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface LeaderboardEntry {
  rank: number;
  student: Student;
  points: number;
  trend: 'up' | 'down' | 'same';
}