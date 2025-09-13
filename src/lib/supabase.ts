import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ritbgaoekfdwzsxryyza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdGJnYW9la2Zkd3pzeHJ5eXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NDQzNjYsImV4cCI6MjA3MzMyMDM2Nn0.kbSxYSLOE_YNOmd2vGEZHq9oIa5XygU6yVQI_QkeU7Y';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  grade: string;
  school: string;
  state: string;
  eco_points: number;
  level: number;
  streak: number;
  total_impact_score: number;
  weekly_goal: number;
  monthly_goal: number;
  join_date: string;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherProfile {
  id: string;
  school: string;
  subject?: string;
  experience_years: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: any;
  quiz: any;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  points: number;
  image_url?: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'conservation' | 'waste' | 'water' | 'energy' | 'biodiversity' | 'climate';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimated_time: string;
  requirements: string[];
  instructions: string[];
  state?: string;
  season?: string;
  image_url?: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  criteria: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  image_url?: string;
  created_at: string;
}

export interface StudentBadge {
  id: string;
  student_id: string;
  badge_id: string;
  date_earned: string;
  badge?: Badge;
}

export interface StudentLesson {
  id: string;
  student_id: string;
  lesson_id: string;
  completed_at: string;
  score?: number;
  lesson?: Lesson;
}

export interface StudentChallenge {
  id: string;
  student_id: string;
  challenge_id: string;
  completed_at: string;
  evidence_urls: string[];
  challenge?: Challenge;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'avatars' | 'achievements' | 'powerups';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image_url?: string;
  is_available: boolean;
  created_at: string;
}

export interface StudentPurchase {
  id: string;
  student_id: string;
  item_id: string;
  purchased_at: string;
  item?: ShopItem;
}