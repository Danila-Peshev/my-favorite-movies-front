import axios from "axios";
import { Genre } from "../types/movie-api-types/Genre";
import { MoviesResponse } from "../types/movie-api-types/MoviesResponse";
import { SimpleMovie } from "../types/movie-api-types/SimpleMovie";
import { Language } from "../types/Language";
import { Movie } from "../types/movie-api-types/Movie";
import { OnlyMovie } from "../types/movie-api-types/OnlyMovie";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`,
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers,
});

async function fetchFromApi(endpoint: string, params: object): Promise<any> {
  const response = await apiClient.get(endpoint, { params });
  return response.data;
}

export async function getAllGenres(activeLanguage: string): Promise<Genre[]> {
  const data = await fetchFromApi('/genre/movie/list', { language: activeLanguage });
  return data.genres;
}

export async function getMoviesByFilters({
  activeLanguage = "ru",
  genreIds = [],
  minCountVotes = 0,
  releaseYear = 0,
  activePage = 1,
}: {
  activeLanguage?: Language;
  genreIds?: number[];
  minCountVotes?: number;
  releaseYear?: number;
  activePage?: number;
} = {}): Promise<MoviesResponse> {
  const data = await fetchFromApi('/discover/movie', {
    include_adult: false,
    include_video: false,
    with_genres: genreIds,
    language: activeLanguage,
    page: activePage,
    sort_by: "popularity.desc",
    "vote_count.gte": minCountVotes,
    primary_release_year: releaseYear,
  });

  const simpleMovies: SimpleMovie[] = data.results.map((movie: Movie) => ({
    id: movie.id,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  }));

  return {
    page: data.page,
    results: simpleMovies,
    total_pages: data.total_pages,
    total_result: data.total_results,
  };
}

export async function getFavoriteMoviesByIds({
  ids = [],
  activeLanguage = "ru",
  page = 1
}: {
  ids?: number[],
  activeLanguage?: Language,
  page?: number
} = {}): Promise<MoviesResponse> {
  if (ids.length === 0) {
    return {
      page,
      results: [],
      total_pages: 0,
      total_result: 0,
    };
  }

  const results = await Promise.all(ids.map(id => getMovieById({ id, activeLanguage })));

  const total_result = results.length;
  const total_pages = Math.ceil(total_result / 20);

  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;

  const paginatedResults = results.slice(startIndex, endIndex);

  return {
    page,
    results: paginatedResults,
    total_pages,
    total_result,
  };
}

export async function getMovieById({
  id,
  activeLanguage = "ru"
}: {
  id: number, 
  activeLanguage?: Language
}): Promise<SimpleMovie> {
  const data: OnlyMovie = await fetchFromApi(`/movie/${id}`, { language: activeLanguage });

  return {
    id: data.id,
    backdrop_path: data.backdrop_path,
    genre_ids: data.genres.map((genre) => genre.id),
    overview: data.overview,
    popularity: data.popularity,
    poster_path: data.poster_path,
    release_date: data.release_date,
    title: data.title,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
  };
}