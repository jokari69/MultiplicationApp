import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProblemDisplayProps {
  num1: number;
  num2: number;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ num1, num2 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.problemContainer}>
        <Text style={styles.number}>{num1}</Text>
        <Text style={styles.operator}>×</Text>
        <Text style={styles.number}>{num2}</Text>
        <Text style={styles.equals}>=</Text>
        <Text style={styles.questionMark}>?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 30,
  },
  problemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  operator: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 10,
  },
  equals: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 10,
  },
  questionMark: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginHorizontal: 10,
  },
});
