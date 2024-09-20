import { useQuery } from "@apollo/client";
import { GET_USER_MOVIES } from "../queries-mutations/queries";

const useUserMovies = (): {
  userMovies: number[];
  watchedUserMovies: number[];
  isLoadingUserMovies: boolean;
  errorUserMovies: Error | null | undefined;
  refetchUserMovies: () => void;
} => {
  const {
    data: userMoviesData,
    loading: isLoadingUserMovies,
    error: errorUserMovies,
    refetch: refetchUserMovies,
  } = useQuery(GET_USER_MOVIES, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const userMovies = userMoviesData?.getUserMovies.map(
    (movie: { movieId: number }) => movie.movieId
  );

  const watchedUserMovies = userMoviesData?.getUserMovies
    .filter((movie: { isWatched: boolean }) => movie.isWatched)
    .map((movie: { movieId: number }) => movie.movieId);

  return {
    userMovies,
    watchedUserMovies,
    isLoadingUserMovies,
    errorUserMovies,
    refetchUserMovies,
  };
};

export default useUserMovies;
