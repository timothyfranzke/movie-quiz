'use client';

import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import AutocompleteInput from './AutocompleteInput';
import { fetchMovieData, Movie } from '../utils/movieData';

export default function MovieQuiz() {
  const {
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
  } = useQuiz();
  
  const [currentGuess, setCurrentGuess] = useState('');
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  
  // Fetch all movies for autocomplete
  useEffect(() => {
    const getMovies = async () => {
      setLoadingMovies(true);
      try {
        const data = await fetchMovieData();
        setAllMovies(data.movies);
      } catch (error) {
        console.error('Failed to load movies for autocomplete:', error);
      } finally {
        setLoadingMovies(false);
      }
    };
    
    getMovies();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentGuess.trim() !== '') {
      makeGuess(currentGuess);
      setCurrentGuess('');
    }
  };
  
  const handleSelectMovie = (title: string) => {
    if (title.trim() !== '') {
      makeGuess(title);
      setCurrentGuess('');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!currentMovie) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold mb-4">Error Loading Quiz</h2>
        <p className="mb-4">We couldn't load today's movie quiz. Please try again later.</p>
        <button 
          onClick={resetQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Daily Movie Quiz</h1>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Today's Movie Clues:</h2>
        <p className="mb-2"><span className="font-medium">Year:</span> {currentMovie.year}</p>
        <p className="mb-2">
          <span className="font-medium">Genres:</span> {currentMovie.genres.join(', ')}
        </p>
        
        {revealedActors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-1">Revealed Actors:</h3>
            <ul className="list-disc list-inside">
              {revealedActors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Attempts Left: {attemptsLeft}</span>
          <button
            onClick={revealActor}
            disabled={isGameOver || revealedActors.length >= currentMovie.actors.length}
            className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reveal Actor
          </button>
        </div>
        
        {!isGameOver && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            {loadingMovies ? (
              <div className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50">
                Loading movie titles...
              </div>
            ) : (
              <AutocompleteInput
                movies={allMovies}
                onSelect={handleSelectMovie}
                disabled={isGameOver}
                placeholder="Enter movie title..."
              />
            )}
            <button
              type="submit"
              disabled={currentGuess.trim() === '' || isGameOver}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Guess
            </button>
          </form>
        )}
      </div>
      
      {guesses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Guesses:</h3>
          <ul className="space-y-2">
            {guesses.map((guess, index) => (
              <li key={index} className="p-2 bg-gray-50 rounded flex justify-between">
                <span>{guess}</span>
                <span>
                  {guess.toLowerCase() === currentMovie.title.toLowerCase() ? (
                    <span className="text-green-500">✓ Correct!</span>
                  ) : (
                    <span className="text-red-500">✗ Incorrect</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isGameOver && (
        <div className="p-4 rounded-lg text-center">
          {isCorrect ? (
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold text-green-700 mb-2">Congratulations!</h3>
              <p className="text-green-600">You guessed the movie correctly: <strong>{currentMovie.title}</strong></p>
            </div>
          ) : (
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold text-red-700 mb-2">Game Over</h3>
              <p className="text-red-600">The correct movie was: <strong>{currentMovie.title}</strong></p>
            </div>
          )}
          
          <p className="mb-4 text-gray-600">Come back tomorrow for a new movie to guess!</p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Movie Details:</h3>
            <p className="mb-1"><span className="font-medium">Title:</span> {currentMovie.title}</p>
            <p className="mb-1"><span className="font-medium">Year:</span> {currentMovie.year}</p>
            <p className="mb-1"><span className="font-medium">Genres:</span> {currentMovie.genres.join(', ')}</p>
            <p className="mb-1"><span className="font-medium">Actors:</span> {currentMovie.actors.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
