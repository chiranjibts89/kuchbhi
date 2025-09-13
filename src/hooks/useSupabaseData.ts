import { useState, useEffect } from 'react';
import { supabase, Lesson, Challenge, Badge, ShopItem } from '../lib/supabase';

export const useSupabaseData = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (lessonsError) throw lessonsError;

      // Load challenges
      const { data: challengesData, error: challengesError } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: true });

      if (challengesError) throw challengesError;

      // Load badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('badges')
        .select('*')
        .order('created_at', { ascending: true });

      if (badgesError) throw badgesError;

      // Load shop items
      const { data: shopItemsData, error: shopItemsError } = await supabase
        .from('shop_items')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: true });

      if (shopItemsError) throw shopItemsError;

      setLessons(lessonsData || []);
      setChallenges(challengesData || []);
      setBadges(badgesData || []);
      setShopItems(shopItemsData || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return {
    lessons,
    challenges,
    badges,
    shopItems,
    loading,
    error,
    refetch: loadData
  };
};