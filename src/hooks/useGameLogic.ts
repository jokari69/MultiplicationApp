import { useState, useCallback } from 'react';

interface Problem {
  num1: number;
  num2: number;
  answer: number;
}

interface UseGameLogicReturn {
  currentProblem: Problem;
  correctAnswers: number;
  totalAnswers: number;
  generateNewProblem: () => void;
  checkAnswer: (userAnswer: number) => boolean;
  resetGame: () => void;
}

export const useGameLogic = (): UseGameLogicReturn => {
  const [currentProblem, setCurrentProblem] = useState<Problem>({
    num1: 1,
    num2: 1,
    answer: 1,
  });
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);

  const generateRandomNumber = useCallback((min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const generateNewProblem = useCallback(() => {
    const num1 = generateRandomNumber(1, 15);
    const num2 = generateRandomNumber(1, 15);
    const answer = num1 * num2;
    
    setCurrentProblem({ num1, num2, answer });
  }, [generateRandomNumber]);

  const checkAnswer = useCallback((userAnswer: number): boolean => {
    const isCorrect = userAnswer === currentProblem.answer;
    
    setTotalAnswers(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    return isCorrect;
  }, [currentProblem.answer]);

  const resetGame = useCallback(() => {
    setCorrectAnswers(0);
    setTotalAnswers(0);
    setCurrentProblem({
      num1: 1,
      num2: 1,
      answer: 1,
    });
  }, []);

  return {
    currentProblem,
    correctAnswers,
    totalAnswers,
    generateNewProblem,
    checkAnswer,
    resetGame,
  };
};
