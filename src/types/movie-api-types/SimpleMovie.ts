import { Genre } from "./Genre"

export type SimpleMovie = {
  backdrop_path: string
  genres: Genre[]
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}