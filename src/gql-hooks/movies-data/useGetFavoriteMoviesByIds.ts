import { useQuery } from "@apollo/client";
import { GET_FAVORITE_MOVIES_BY_IDS } from "../../queries-mutations/queries";
import { Language } from "../../types/Language";
import { MoviesResponse } from "../../types/movie-api-types/MoviesResponse";

const useGetFavoriteMoviesByIds = (
  ids: number[],
  language: Language,
  page: number
): {
  moviesResponse: MoviesResponse;
  isLoadingFavoriteMoviesByIds: boolean;
  refetchFavoriteMoviesByIds: () => void;
} => {
  const {
    data: dataFavoriteMoviesByIds,
    loading: isLoadingFavoriteMoviesByIds,
    refetch: refetchFavoriteMoviesByIds,
  } = useQuery(GET_FAVORITE_MOVIES_BY_IDS, {
    variables: { ids, language, page },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const moviesResponse = dataFavoriteMoviesByIds?.getFavoriteMoviesByIds;

  return {
    moviesResponse,
    isLoadingFavoriteMoviesByIds,
    refetchFavoriteMoviesByIds,
  };
};

export default useGetFavoriteMoviesByIds;
