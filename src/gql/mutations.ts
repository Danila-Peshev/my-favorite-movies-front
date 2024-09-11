import { gql } from "@apollo/client";

export const TOGGLE_USER_GENRE = gql`
  mutation toggleUserGenre($userId: Int!, $genreId: Int!) {
    toggleUserGenre(userId: $userId, genreId: $genreId) {
      success
    }
  }
`;

export const TOGGLE_USER_MOVIE = gql`
  mutation toggleUserMovie($userId: Int!, $movieId: Int!) {
    toggleUserMovie(userId: $userId, movieId: $movieId) {
      success
    }
  }
`;

export const TOGGLE_WATCH_MOVIE = gql`
  mutation toggleWatchMovie($userId: Int!, $movieId: Int!) {
    toggleWatchMovie(userId: $userId, movieId: $movieId) {
      isWatched
    }
  }
`;