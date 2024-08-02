import { SimpleMovie } from "./SimpleMovie";

export type MoviesResponse = {
  page: number;
  results: SimpleMovie[];
  totalPages: number;
  totalResult: number;
}