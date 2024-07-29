import axios from "axios";
import { Genre } from "../types/movie-api-types/Genre";
import { MoviesResponse } from "../types/movie-api-types/MoviesResponse";
import { OnlyMovie } from "../types/movie-api-types/OnlyMovie";

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

export async function getMovieById(id: number, activeLanguage: string): Promise<OnlyMovie> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`, {
    headers,
    params: {
      language: activeLanguage
    } 
  }
  )
  return response.data;
}