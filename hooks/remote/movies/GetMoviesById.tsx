import api from "../Api";

interface Props {
  id: number;
}

const GetMovieById = async (props: Props): Promise<Movie | undefined> => {
  try {
    const url = `/movie/${props.id}`;
    const response = await api.get<Movie>(url);
    const movie = response.data;
    console.log("Movies:", movie);
    return movie;
  } catch (error) {
    return undefined;
  }
};

export default GetMovieById;
