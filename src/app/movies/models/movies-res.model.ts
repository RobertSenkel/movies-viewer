import { Movie } from "./movie.model";

export interface MoviesRest {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
