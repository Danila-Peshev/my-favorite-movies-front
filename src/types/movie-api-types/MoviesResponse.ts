import { Movie } from "./Movie";

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
}