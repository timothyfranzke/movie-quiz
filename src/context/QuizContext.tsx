'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMovieData, getDailyMovie } from '../utils/movieData';

interface Movie {
  title: string;
  year: number;
  genres: string[];
  actors: string[];
}

interface QuizContextType {
  currentMovie: Movie | null;
  loading: boolean;
  attemptsLeft: number;
  guesses: string[];
  revealedActors: string[];
  isCorrect: boolean;
  isGameOver: boolean;
  makeGuess: (guess: string) => void;
  revealActor: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [revealedActors, setRevealedActors] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastPlayedDate, setLastPlayedDate] = useState<string>('');

  // Load movie data and set up the daily quiz
  useEffect(() => {
    const initializeQuiz = async () => {
      setLoading(true);
      
      // Check if we need to reset the quiz for a new day
      const today = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('lastPlayedDate');
      
      // If it's a new day, reset the quiz
      if (storedDate !== today) {
        resetQuizState();
        localStorage.setItem('lastPlayedDate', today);
        setLastPlayedDate(today);
      } else {
        // Load saved state if available
        loadSavedState();
      }
      
      // Fetch movie data if we don't have a current movie
      if (!currentMovie) {
        try {
          const data = await fetchMovieData();
          const dailyMovie = getDailyMovie(data.movies);
          setCurrentMovie(dailyMovie);
        } catch (error) {
          console.error('Failed to initialize quiz:', error);
        }
      }
      
      setLoading(false);
    };
    
    initializeQuiz();
  }, [lastPlayedDate]);

  // Save the current state to localStorage whenever it changes
  useEffect(() => {
    if (!loading && currentMovie) {
      saveCurrentState();
    }
  }, [attemptsLeft, guesses, revealedActors, isCorrect, isGameOver, currentMovie, loading]);

  const saveCurrentState = () => {
    localStorage.setItem('quizState', JSON.stringify({
      attemptsLeft,
      guesses,
      revealedActors,
      isCorrect,
      isGameOver,
      currentMovie
    }));
  };

  const loadSavedState = () => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setAttemptsLeft(state.attemptsLeft);
      setGuesses(state.guesses);
      setRevealedActors(state.revealedActors);
      setIsCorrect(state.isCorrect);
      setIsGameOver(state.isGameOver);
      setCurrentMovie(state.currentMovie);
    }
  };

  const resetQuizState = () => {
    setAttemptsLeft(6);
    setGuesses([]);
    setRevealedActors([]);
    setIsCorrect(false);
    setIsGameOver(false);
    setCurrentMovie(null);
    localStorage.removeItem('quizState');
  };

  const makeGuess = (guess: string) => {
    if (isGameOver || isCorrect || attemptsLeft <= 0) return;
    
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = currentMovie?.title.toLowerCase() || '';
    
    // Add the guess to the list
    setGuesses([...guesses, guess]);
    
    // Check if the guess is correct
    if (normalizedGuess === normalizedTitle) {
      setIsCorrect(true);
      setIsGameOver(true);
    } else {
      // Reduce attempts left
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      
      // Check if game is over
      if (newAttemptsLeft <= 0) {
        setIsGameOver(true);
      }
    }
  };

  const revealActor = () => {
    if (isGameOver || isCorrect || attemptsLeft <= 0 || !currentMovie) return;
    
    // Find an actor that hasn't been revealed yet
    const unrevealedActors = currentMovie.actors.filter(actor => !revealedActors.includes(actor));
    
    if (unrevealedActors.length > 0) {
      const actorToReveal = unrevealedActors[0];
      setRevealedActors([...revealedActors, actorToReveal]);
      
      // Revealing an actor counts as an attempt
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      
      // Check if game is over
      if (newAttemptsLeft <= 0) {
        setIsGameOver(true);
      }
    }
  };

  const resetQuiz = () => {
    resetQuizState();
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastPlayedDate', today);
    setLastPlayedDate(today);
  };

  return (
    <QuizContext.Provider
      value={{
        currentMovie,
        loading,
        attemptsLeft,
        guesses,
        revealedActors,
        isCorrect,
        isGameOver,
        makeGuess,
        revealActor,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
