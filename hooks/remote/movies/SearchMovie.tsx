import api from "../Api";

interface Props {
  query: string;
  page: number;
}
interface GetMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

const GetSearchMovie = async (
  query: string,
  page: number
): Promise<MoviesPagination> => {
  try {
    const url =
      "/search/movie?query=" + query + "&include_adult=false&page=" + page;
    const response = await api.get<GetMovieResponse>(url);
    const movieResponse = response.data;
    return {
      movies: movieResponse.results,
      load_more: page < movieResponse.total_pages,
    };
  } catch {
    return { movies: [], load_more: false };
  }
};

export default GetSearchMovie;
