import api from "../Api";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

async function GetPopularMovies(): Promise<Movie[]> {
  try {
    const response = await api.get<{ results: Movie[] }>("/movie/popular");
    const movies = response.data.results; // Access the results array
    console.log("Popular Movies:", movies);
    return movies; // Return the list of movies
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; // Return an empty array on error
  }
}

export default GetPopularMovies;
