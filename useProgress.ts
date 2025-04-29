import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lesson } from '../data/lessons';

interface Badge {
  id: string;
  name: string;
  icon: string;
}

interface UseProgressReturn {
  completedLessons: number[];
  earnedBadges: Badge[];
  completeLesson: (lessonId: number, badge?: Badge) => Promise<boolean>;
  isLessonCompleted: (lessonId: number) => boolean;
  canAccessLesson: (lessonId: number) => boolean;
}

const PROGRESS_KEY = '@learning_progress';
const BADGES_KEY = '@earned_badges';

export const useProgress = (): UseProgressReturn => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem(PROGRESS_KEY);
      const badges = await AsyncStorage.getItem(BADGES_KEY);
      
      if (progress) {
        setCompletedLessons(JSON.parse(progress));
      }
      if (badges) {
        setEarnedBadges(JSON.parse(badges));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const completeLesson = async (lessonId: number, badge?: Badge): Promise<boolean> => {
    try {
      const updatedLessons = [...completedLessons, lessonId];
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedLessons));
      setCompletedLessons(updatedLessons);

      if (badge) {
        const updatedBadges = [...earnedBadges, badge];
        await AsyncStorage.setItem(BADGES_KEY, JSON.stringify(updatedBadges));
        setEarnedBadges(updatedBadges);
      }

      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    }
  };

  const isLessonCompleted = (lessonId: number): boolean => {
    return completedLessons.includes(lessonId);
  };

  const canAccessLesson = (lessonId: number): boolean => {
    if (lessonId === 1) return true;
    return isLessonCompleted(lessonId - 1);
  };

  return {
    completedLessons,
    earnedBadges,
    completeLesson,
    isLessonCompleted,
    canAccessLesson,
  };
}; 