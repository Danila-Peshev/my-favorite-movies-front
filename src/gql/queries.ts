import { gql } from "@apollo/client";

export const GET_USER_MOVIES = gql`
  query getUserMovies($userId: Int!) {
    getUserMovies(userId: $userId) {
      movieId
    }
  }
`;

export const GET_USER_GENRES = gql`
  query getUserGenres($userId: Int!) {
    getUserGenres(userId: $userId) {
      movieId
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

export const GET_MOVIE_BY_ID = gql`
  query getMovieById($id: Int!, $language: String) {
    getMovieById(id: $id, language: $language) {
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
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;
