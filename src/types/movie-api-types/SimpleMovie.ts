import { Genre } from "./Genre"

export type SimpleMovie = {
  id: number
  backdrop_path: string
  genre_ids: number[]
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}