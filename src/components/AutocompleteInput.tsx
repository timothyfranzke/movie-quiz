'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../utils/movieData';

interface AutocompleteInputProps {
  movies: Movie[];
  onSelect: (title: string) => void;
  disabled: boolean;
  placeholder: string;
}

export default function AutocompleteInput({ 
  movies, 
  onSelect, 
  disabled, 
  placeholder 
}: AutocompleteInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // Filter suggestions based on input value
  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }

    const movieTitles = movies.map(movie => movie.title);
    const filteredSuggestions = movieTitles.filter(title =>
      title.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filteredSuggestions);
    setActiveSuggestionIndex(0);
  }, [inputValue, movies]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter key - select the current suggestion
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0 && showSuggestions) {
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      } else if (inputValue.trim() !== '') {
        onSelect(inputValue);
        setInputValue('');
      }
    }
    // Arrow down - navigate to the next suggestion
    else if (e.key === 'ArrowDown') {
      if (suggestions.length > 0) {
        setActiveSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      }
    }
    // Arrow up - navigate to the previous suggestion
    else if (e.key === 'ArrowUp') {
      if (suggestions.length > 0) {
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : 0
        );
      }
    }
    // Escape - close suggestions
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Movie title input"
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-expanded={showSuggestions && suggestions.length > 0}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          id="suggestions-list"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeSuggestionIndex ? 'bg-blue-50' : ''
              }`}
              role="option"
              aria-selected={index === activeSuggestionIndex}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
