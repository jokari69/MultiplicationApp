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

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'game'>('home');
  const isDarkMode = useColorScheme() === 'dark';

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleExitGame = () => {
    setCurrentScreen('home');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#f5f5f5"
      />
      {currentScreen === 'home' ? (
        <HomeScreen onStartGame={handleStartGame} />
      ) : (
        <GameScreen onExit={handleExitGame} />
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
