import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      email
    }
  }
`;

export const GET_USER_MOVIES = gql`
  query getUserMovies {
    getUserMovies {
      movieId
      isWatched
    }
  }
`;

export const GET_USER_GENRES = gql`
  query getUserGenres {
    getUserGenres {
      genreId
    }
  }
`;

export const GET_ALL_GENRES = gql`
  query getAllGenres($language: String) {
    getAllGenres(language: $language) {
      id
      name
    }
  }
`;

export const GET_MOVIES_BY_FILTERS = gql`
  query getMoviesByFilters(
    $language: String
    $genreIds: [Int!]
    $minCountVotes: Int
    $releaseYear: Int
    $page: Int
  ) {
    getMoviesByFilters(
      language: $language
      genreIds: $genreIds
      minCountVotes: $minCountVotes
      releaseYear: $releaseYear
      page: $page
    ) {
      page
      results {
        id
        backdropPath
        genreIds
        overview
        popularity
        posterPath
        releaseDate
        title
        voteAverage
        voteCount
      }
      totalPages
      totalResult
    }
  }
`;

export const GET_FAVORITE_MOVIES_BY_IDS = gql`
  query getFavoriteMoviesByIds($ids: [Int!]!, $language: String, $page: Int) {
    getFavoriteMoviesByIds(ids: $ids, language: $language, page: $page) {
      page
      results {
        id
        backdropPath
        genreIds
        overview
        popularity
        posterPath
        releaseDate
        title
        voteAverage
        voteCount
      }
      totalPages
      totalResult
    }
  }
`;
