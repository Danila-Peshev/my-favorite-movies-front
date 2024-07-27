import axios from "axios";
import { Movie } from "../types/Movie";
import { Genre } from "../types/Genre";

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`
};

export async function getAllGenres(): Promise<Genre[]> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/genre/movie/list`, {
    headers,
    params: {
      language: "ru-RU"
    } 
  }
  )
  console.log(response.data.genres);
  return response.data.genres;
} 

export async function getMoviesByGenres(genreIds: number[]): Promise<Movie[]> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
    headers,
    params: {
      include_adult: false,
      include_video: false,
      with_genres: genreIds,
      language: "ru-RU",
      page: 1,
      sort_by: "popularity.desc"
    } 
  }
  )
  return response.data.results;
} 