import { SimpleMovie } from "./SimpleMovie";

export type MoviesResponse = {
  page: number;
  results: SimpleMovie[];
  total_pages: number;
  total_result: number;
}