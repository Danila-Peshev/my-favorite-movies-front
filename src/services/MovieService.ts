import axios from "axios";
import { Genre } from "../types/movie-api-types/Genre";
import { MoviesResponse } from "../types/movie-api-types/MoviesResponse";
import { SimpleMovie } from "../types/movie-api-types/SimpleMovie";

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`
};

export async function getAllGenres(activeLanguage: string): Promise<Genre[]> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/genre/movie/list`, {
    headers,
    params: {
      language: activeLanguage
    } 
  }
  )
  return response.data.genres;
} 

export async function getAllMovies(activePage: number | 1 ,activeLanguage: string): Promise<MoviesResponse> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
    headers,
    params: {
      include_adult: false,
      include_video: false,
      language: activeLanguage,
      page: activePage,
      sort_by: "popularity.desc"
    } 
  }
  )
  console.log(response.data);
  return response.data;
} 

export async function getMoviesByGenres(genreIds: number[], activePage: number | 1 ,activeLanguage: string): Promise<MoviesResponse> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
    headers,
    params: {
      include_adult: false,
      include_video: false,
      with_genres: genreIds,
      language: activeLanguage,
      page: activePage,
      sort_by: "popularity.desc"
    } 
  }
  )
  return response.data;
} 

export async function getMovieById(id: number, activeLanguage: string): Promise<SimpleMovie> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`, {
    headers,
    params: {
      language: activeLanguage
    } 
  }
  )

  const movie: SimpleMovie = {
    backdrop_path: response.data.backdrop_path,
    genres: response.data.genres,
    overview: response.data.overview,
    popularity: response.data.popularity,
    poster_path: response.data.poster_path,
    release_date: response.data.release_date,
    title: response.data.title,
    vote_average: response.data.vote_average,
    vote_count: response.data.vote_count
  }

  return movie;
}