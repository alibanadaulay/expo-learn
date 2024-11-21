interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  cast: Cast[];
  popularity: number;
}
