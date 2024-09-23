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
