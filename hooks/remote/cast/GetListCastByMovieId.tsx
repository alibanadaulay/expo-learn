import api from "../Api";
interface Props {
  movieId: number;
}

interface CastResponse {
  id: number;
  cast: Cast[];
}

const GetListCastByMovieId = async (props: Props): Promise<Cast[]> => {
  try {
    const url = `movie/${props.movieId}/credits`;
    const response = await api.get<{ results: CastResponse[] }>(url);
    response.data.results;
    console.log("GetListCastByMovieId:", response.data.cast);
    return response.data.cast; // Return the list of movies
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; // Return an empty array on error
  }
};

export default GetListCastByMovieId;
