import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const TOGGLE_USER_GENRE = gql`
  mutation toggleUserGenre($genreId: Int!) {
    toggleUserGenre(genreId: $genreId) {
      success
    }
  }
`;

export const TOGGLE_USER_MOVIE = gql`
  mutation toggleUserMovie($movieId: Int!) {
    toggleUserMovie(movieId: $movieId) {
      success
    }
  }
`;

export const TOGGLE_WATCH_MOVIE = gql`
  mutation toggleWatchMovie($movieId: Int!) {
    toggleWatchMovie(movieId: $movieId) {
      isWatched
    }
  }
`;
