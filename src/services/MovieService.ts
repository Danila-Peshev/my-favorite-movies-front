import axios from "axios";
import { Genre } from "../types/movie-api-types/Genre";
import { MoviesResponse } from "../types/movie-api-types/MoviesResponse";
import { SimpleMovie } from "../types/movie-api-types/SimpleMovie";
import { Language } from "../types/Language";
import { Movie } from "../types/movie-api-types/Movie";
import { MAX_MOVIES_ON_PAGE } from "../constants/movie_constants";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`,
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers,
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timed out"));
    }
    if (error.response) {
      return Promise.reject(new Error("Status not 200"));
    } else if (error.request) {
      return Promise.reject(new Error("Network Error"));
    } else {
      return Promise.reject(new Error(`Request Error: ${error.message}`));
    }
  }
);

async function fetchFromApi(endpoint: string, params: object): Promise<any> {
  const response = await apiClient.get(endpoint, { params });
  return response.data;
}

export async function getAllGenres(language: string): Promise<Genre[]> {
  const data = await fetchFromApi("/genre/movie/list", { language });
  return data.genres;
}

export async function getMoviesByFilters({
  language = "ru",
  genreIds = [],
  minCountVotes = 0,
  releaseYear = 0,
  activePage = 1,
}: {
  language?: Language;
  genreIds?: number[];
  minCountVotes?: number;
  releaseYear?: number;
  activePage?: number;
} = {}): Promise<MoviesResponse> {
  const data = await fetchFromApi("/discover/movie", {
    include_adult: false,
    include_video: false,
    with_genres: genreIds,
    language: language,
    page: activePage,
    sort_by: "popularity.desc",
    "vote_count.gte": minCountVotes,
    primary_release_year: releaseYear,
  });

  const simpleMovies: SimpleMovie[] = data.results.map(
    ({
      id,
      backdrop_path,
      genre_ids,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      vote_average,
      vote_count,
    }: Movie) => ({
      id,
      backdropPath: backdrop_path,
      genreIds: genre_ids,
      overview,
      popularity,
      posterPath: poster_path,
      releaseDate: release_date,
      title,
      voteAverage: vote_average,
      voteCount: vote_count,
    })
  );

  return {
    page: data.page,
    results: simpleMovies,
    totalPages: data.total_pages,
    totalResult: data.total_results,
  };
}

export async function getFavoriteMoviesByIds({
  ids,
  language = "ru",
  page = 1,
}: {
  ids: number[];
  language?: Language;
  page?: number;
}): Promise<MoviesResponse> {
  const results = await Promise.all(
    ids.map((id) => getMovieById({ id, language }))
  );
  const totalResult = results.length;
  const totalPages = Math.ceil(totalResult / MAX_MOVIES_ON_PAGE);

  const startIndex = (page - 1) * MAX_MOVIES_ON_PAGE;
  const endIndex = startIndex + MAX_MOVIES_ON_PAGE;

  const paginatedResults = results.slice(startIndex, endIndex);

  return {
    page,
    results: paginatedResults,
    totalPages,
    totalResult,
  };
}

export async function getMovieById({
  id,
  language = "ru",
}: {
  id: number;
  language?: Language;
}): Promise<SimpleMovie> {
  const data = await fetchFromApi(`/movie/${id}`, { language: language });

  return {
    id: data.id,
    backdropPath: data.backdrop_path,
    genreIds: data.genres.map(({ id }: { id: number }) => id),
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  };
}
