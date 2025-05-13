interface Movie {
  title: string;
  year: number;
  genres: string[];
  actors: string[];
}

interface MovieData {
  movies: Movie[];
  lastUpdated: string;
}

// Function to fetch the IMDb Top 250 movies data
export async function fetchMovieData(): Promise<MovieData> {
  try {
    // Fetch data from the provided source
    const response = await fetch('https://raw.githubusercontent.com/movie-monk-b0t/top250/main/top250.json', {
      // Refresh the data every day
      next: { revalidate: 86400 } // 24 hours in seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie data');
    }
    
    const data = await response.json();
    
    // Transform the data to match our Movie interface
    const movies: Movie[] = data.map((movie: any) => ({
      title: movie.title,
      year: parseInt(movie.year),
      genres: movie.genre.split(', '),
      actors: movie.actors.split(', ')
    }));
    
    return {
      movies,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    // Return empty data in case of error
    return {
      movies: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

// Function to get the daily movie based on the date
export function getDailyMovie(movies: Movie[]): Movie | null {
  if (movies.length === 0) {
    return null;
  }
  
  // Use the current date to determine which movie to show
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Use the day of the year to select a movie (ensuring it cycles through the list)
  const movieIndex = dayOfYear % movies.length;
  
  return movies[movieIndex];
}
