import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { Lesson, Challenge, Badge } from '../lib/supabase';

interface StudentContextType {
  lessons: Lesson[];
  challenges: Challenge[];
  badges: Badge[];
  completedLessons: string[];
  completedChallenges: string[];
  earnedBadges: string[];
  ownedItems: string[];
  loading: boolean;
  error: string | null;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    studentLessons, 
    studentChallenges, 
    studentBadges, 
    studentPurchases 
  } = useAuth();
  
  const { 
    lessons, 
    challenges, 
    badges, 
    loading, 
    error 
  } = useSupabaseData();

  // Derive completed items from auth context
  const completedLessons = studentLessons.map(sl => sl.lesson_id);
  const completedChallenges = studentChallenges.map(sc => sc.challenge_id);
  const earnedBadges = studentBadges.map(sb => sb.badge_id);
  const ownedItems = studentPurchases.map(sp => sp.item_id);

  return (
    <StudentContext.Provider value={{
      lessons,
      challenges,
      badges,
      completedLessons,
      completedChallenges,
      earnedBadges,
      ownedItems,
      loading,
      error
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};