import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTimer } from '../hooks/useTimer';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameStats } from './GameStats';
import { ProblemDisplay } from './ProblemDisplay';
import { InputSection } from './InputSection';

interface GameScreenProps {
  onExit: () => void;
  onGameComplete: (result: {
    score: number;
    totalQuestions: number;
    accuracy: number;
    time: number;
  }) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onExit, onGameComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);
  
  const { seconds, minutes, start, stop, reset } = useTimer();
  const {
    currentProblem,
    correctAnswers,
    totalAnswers,
    generateNewProblem,
    checkAnswer,
    resetGame,
  } = useGameLogic();

  const handleStartGame = useCallback(() => {
    setIsGameActive(true);
    resetGame();
    generateNewProblem();
    reset();
    start();
  }, [resetGame, generateNewProblem, reset, start]);

  const handleSubmitAnswer = useCallback(() => {
    if (answer.trim() === '') return;
    
    const numericAnswer = parseInt(answer.trim(), 10);
    if (isNaN(numericAnswer)) {
      Alert.alert('Invalid Input', 'Please enter a valid number');
      return;
    }

    const isCorrect = checkAnswer(numericAnswer);
    setAnswer('');
    generateNewProblem();
    
    if (isCorrect) {
      // Visual feedback for correct answer could be added here
    }
  }, [answer, checkAnswer, generateNewProblem]);

  const handleStopGame = useCallback(() => {
    setIsGameActive(false);
    stop();
    
    const totalTime = minutes * 60 + seconds;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    
    if (totalAnswers > 0) {
      onGameComplete({
        score: correctAnswers,
        totalQuestions: totalAnswers,
        accuracy,
        time: totalTime,
      });
    } else {
      onExit();
    }
  }, [stop, correctAnswers, totalAnswers, minutes, seconds, onGameComplete, onExit]);

  const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Multiplication Practice</Text>
            <GameStats
              time={`${minutes}:${seconds.toString().padStart(2, '0')}`}
              correctAnswers={correctAnswers}
              totalAnswers={totalAnswers}
              accuracy={accuracy}
            />
          </View>

          {!isGameActive ? (
            <View style={styles.startScreen}>
              <Text style={styles.welcomeText}>
                Welcome to Multiplication Practice!
              </Text>
              <Text style={styles.instructionText}>
                Practice your multiplication tables from 1 to 15.
                See how many you can get right!
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                <Text style={styles.buttonText}>Start Game</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.gameArea}>
              <ProblemDisplay
                num1={currentProblem.num1}
                num2={currentProblem.num2}
              />
              <InputSection
                value={answer}
                onChangeText={setAnswer}
                onSubmit={handleSubmitAnswer}
                placeholder="Enter your answer"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSubmitAnswer}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.stopButton]}
                  onPress={handleStopGame}
                >
                  <Text style={styles.buttonText}>Stop Game</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButton: {
    backgroundColor: '#2196F3',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
