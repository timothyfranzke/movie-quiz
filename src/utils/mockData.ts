// Mock data for IMDb Top 250 movies
export const mockMovieData = {
  movies: [
    {
      title: "The Shawshank Redemption",
      year: 1994,
      genres: ["Drama"],
      actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"]
    },
    {
      title: "The Godfather",
      year: 1972,
      genres: ["Crime", "Drama"],
      actors: ["Marlon Brando", "Al Pacino", "James Caan", "Richard S. Castellano"]
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genres: ["Action", "Crime", "Drama", "Thriller"],
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"]
    },
    {
      title: "The Godfather: Part II",
      year: 1974,
      genres: ["Crime", "Drama"],
      actors: ["Al Pacino", "Robert De Niro", "Robert Duvall", "Diane Keaton"]
    },
    {
      title: "12 Angry Men",
      year: 1957,
      genres: ["Crime", "Drama"],
      actors: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam", "John Fiedler"]
    },
    {
      title: "Schindler's List",
      year: 1993,
      genres: ["Biography", "Drama", "History"],
      actors: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley", "Caroline Goodall"]
    },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
      genres: ["Action", "Adventure", "Drama", "Fantasy"],
      actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen", "Orlando Bloom"]
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      genres: ["Crime", "Drama"],
      actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"]
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
      genres: ["Action", "Adventure", "Drama", "Fantasy"],
      actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom", "Sean Bean"]
    },
    {
      title: "The Good, the Bad and the Ugly",
      year: 1966,
      genres: ["Western"],
      actors: ["Clint Eastwood", "Eli Wallach", "Lee Van Cleef", "Aldo Giuffrè"]
    },
    {
      title: "Forrest Gump",
      year: 1994,
      genres: ["Drama", "Romance"],
      actors: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"]
    },
    {
      title: "Fight Club",
      year: 1999,
      genres: ["Drama"],
      actors: ["Brad Pitt", "Edward Norton", "Meat Loaf", "Zach Grenier"]
    },
    {
      title: "Inception",
      year: 2010,
      genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Ken Watanabe"]
    },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
      genres: ["Action", "Adventure", "Drama", "Fantasy"],
      actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen", "Orlando Bloom"]
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
      genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
      actors: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Billy Dee Williams"]
    },
    {
      title: "The Matrix",
      year: 1999,
      genres: ["Action", "Sci-Fi"],
      actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"]
    },
    {
      title: "Goodfellas",
      year: 1990,
      genres: ["Biography", "Crime", "Drama"],
      actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci", "Lorraine Bracco"]
    },
    {
      title: "One Flew Over the Cuckoo's Nest",
      year: 1975,
      genres: ["Drama"],
      actors: ["Jack Nicholson", "Louise Fletcher", "Will Sampson", "Michael Berryman"]
    },
    {
      title: "Seven Samurai",
      year: 1954,
      genres: ["Action", "Adventure", "Drama"],
      actors: ["Toshirô Mifune", "Takashi Shimura", "Keiko Tsushima", "Yukiko Shimazaki"]
    },
    {
      title: "Se7en",
      year: 1995,
      genres: ["Crime", "Drama", "Mystery", "Thriller"],
      actors: ["Morgan Freeman", "Brad Pitt", "Kevin Spacey", "Andrew Kevin Walker"]
    }
  ],
  lastUpdated: new Date().toISOString()
};

// Function to get a movie based on the day
export function getMockDailyMovie() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const movieIndex = dayOfYear % mockMovieData.movies.length;
  
  return mockMovieData.movies[movieIndex];
}
