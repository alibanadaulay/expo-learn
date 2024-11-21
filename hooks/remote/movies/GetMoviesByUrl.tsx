import api from "../Api";
interface Props {
  url: string;
}

const GetMoviesByUrl = async (props: Props): Promise<Movie[]> => {
  try {
    const response = await api.get<{ results: Movie[] }>(props.url);
    const movies = response.data.results; // Access the results array
    return movies; // Return the list of movies
  } catch (error) {
    return []; // Return an empty array on error
  }
};

export default GetMoviesByUrl;
