import api from "../Api";

const GetSimilarMovies = async (id: number): Promise<Movie[]> => {
  try {
    const url = `movie/${id}/similar`;
    const response = await api.get<{ results: Movie[] }>(url);
    return response.data.results; // Access the results array
  } catch (error) {
    return []; // Return an empty array on error
  }
};

export default GetSimilarMovies;
