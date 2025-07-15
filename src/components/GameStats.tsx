import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GameStatsProps {
  time: string;
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
}

export const GameStats: React.FC<GameStatsProps> = ({
  time,
  correctAnswers,
  totalAnswers,
  accuracy,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Time</Text>
        <Text style={styles.statValue}>{time}</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Correct</Text>
        <Text style={styles.statValue}>{correctAnswers}/{totalAnswers}</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Accuracy</Text>
        <Text style={styles.statValue}>{accuracy}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
