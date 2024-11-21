interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // Can be null if no profile image is available
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
