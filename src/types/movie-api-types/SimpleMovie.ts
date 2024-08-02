import { Genre } from "./Genre"

export type SimpleMovie = {
  id: number
  backdropPath: string
  genreIds: number[]
  overview: string
  popularity: number
  posterPath: string
  releaseDate: string
  title: string
  voteAverage: number
  voteCount: number
}