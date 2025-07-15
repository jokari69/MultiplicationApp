import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeCompleted: number; // in seconds
  date: string;
}

const LEADERBOARD_KEY = 'multiplication_leaderboard';

export const useLeaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: Omit<LeaderboardEntry, 'id' | 'date'>): Promise<void> => {
    try {
      const newEntry: LeaderboardEntry = {
        ...entry,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };

      const updatedEntries = [...entries, newEntry]
        .sort((a, b) => {
          // Sort by score first, then by accuracy, then by time (lower is better)
          if (b.score !== a.score) return b.score - a.score;
          if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
          return a.timeCompleted - b.timeCompleted;
        })
        .slice(0, 10); // Keep only top 10

      setEntries(updatedEntries);
      await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error adding leaderboard entry:', error);
    }
  };

  const clearLeaderboard = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(LEADERBOARD_KEY);
      setEntries([]);
    } catch (error) {
      console.error('Error clearing leaderboard:', error);
    }
  };

  return {
    entries,
    loading,
    addEntry,
    clearLeaderboard,
  };
};