/**
 * Multiplication Table Practice App
 * iPad-optimized multiplication table practice app
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { GameScreen } from './src/components/GameScreen';
import { HomeScreen } from './src/components/HomeScreen';
import { Leaderboard } from './src/components/Leaderboard';
import { NameInput } from './src/components/NameInput';
import { useLeaderboard } from './src/hooks/useLeaderboard';

type AppScreen = 'home' | 'game' | 'leaderboard';

interface GameResult {
  score: number;
  totalQuestions: number;
  accuracy: number;
  time: number;
}

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [showNameInput, setShowNameInput] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const isDarkMode = useColorScheme() === 'dark';
  
  const { entries, addEntry, clearLeaderboard } = useLeaderboard();

  const handleStartGame = (): void => {
    setCurrentScreen('game');
  };

  const handleShowLeaderboard = (): void => {
    setCurrentScreen('leaderboard');
  };

  const handleGameComplete = (result: GameResult): void => {
    setGameResult(result);
    setShowNameInput(true);
  };

  const handleExitGame = (): void => {
    setCurrentScreen('home');
  };

  const handleNameSubmit = async (name: string): Promise<void> => {
    if (gameResult) {
      await addEntry({
        playerName: name,
        score: gameResult.score,
        totalQuestions: gameResult.totalQuestions,
        accuracy: gameResult.accuracy,
        timeCompleted: gameResult.time,
      });
      setShowNameInput(false);
      setGameResult(null);
      setCurrentScreen('leaderboard');
    }
  };

  const handleNameCancel = (): void => {
    setShowNameInput(false);
    setGameResult(null);
    setCurrentScreen('home');
  };

  const handleCloseLeaderboard = (): void => {
    setCurrentScreen('home');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onStartGame={handleStartGame}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );
      case 'game':
        return (
          <GameScreen 
            onExit={handleExitGame}
            onGameComplete={handleGameComplete}
          />
        );
      case 'leaderboard':
        return (
          <Leaderboard
            entries={entries}
            onClose={handleCloseLeaderboard}
            onClear={clearLeaderboard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#f5f5f5"
      />
      {renderCurrentScreen()}
      {gameResult && (
        <NameInput
          visible={showNameInput}
          onSubmit={handleNameSubmit}
          onCancel={handleNameCancel}
          score={gameResult.score}
          totalQuestions={gameResult.totalQuestions}
          accuracy={gameResult.accuracy}
          time={gameResult.time}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
