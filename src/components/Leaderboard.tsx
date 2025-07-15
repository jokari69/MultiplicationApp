import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { LeaderboardEntry } from '../hooks/useLeaderboard';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClose: () => void;
  onClear: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onClose, onClear }) => {
  const handleClearLeaderboard = (): void => {
    Alert.alert(
      'Clear Leaderboard',
      'Are you sure you want to clear all leaderboard entries? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: onClear
        }
      ]
    );
  };

  const renderEntry = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <View style={[styles.entryContainer, index < 3 && styles.topThree]}>
      <View style={styles.rankContainer}>
        <Text style={[styles.rank, index < 3 && styles.topRank]}>
          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
        </Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.playerName}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{item.score}</Text>
        <Text style={styles.accuracy}>{item.accuracy}%</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(item.timeCompleted)}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🏆</Text>
      <Text style={styles.emptyStateTitle}>No scores yet!</Text>
      <Text style={styles.emptyStateText}>
        Complete a multiplication practice session to appear on the leaderboard.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <View style={styles.headerButtons}>
          {entries.length > 0 && (
            <TouchableOpacity onPress={handleClearLeaderboard} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {entries.length > 0 && (
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Rank</Text>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Score</Text>
          <Text style={styles.headerText}>Time</Text>
          <Text style={styles.headerText}>Date</Text>
        </View>
      )}

      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#666',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#e8f4f8',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#555',
    flex: 1,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topThree: {
    backgroundColor: '#fff8e1',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  rankContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  topRank: {
    fontSize: 20,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  accuracy: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  timeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});