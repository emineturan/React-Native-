import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = '@learning_progress';
const BADGES_KEY = '@earned_badges';

export const useProgress = () => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);

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

  const completeLesson = async (lessonId, badge) => {
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

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const canAccessLesson = (lessonId) => {
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