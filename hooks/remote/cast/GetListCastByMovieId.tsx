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
    const response = await api.get<CastResponse>(url);
    return response.data.cast;
  } catch (error) {
    return [];
  }
};

export default GetListCastByMovieId;
