import api from "../Api";
interface Props {
  url: string;
  page?: number;
}
interface GetMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

const GetMoviesByUrl = async ({
  url,
  page = 1,
}: Props): Promise<MoviesPagination> => {
  try {
    const urlPage = url + "?page=" + page;
    const result = await api.get<GetMovieResponse>(urlPage);
    const movieResponse = result.data;
    return {
      movies: movieResponse.results,
      load_more: page < movieResponse.total_pages,
    };
  } catch (error) {
    return { movies: [], load_more: false };
  }
};

export default GetMoviesByUrl;
