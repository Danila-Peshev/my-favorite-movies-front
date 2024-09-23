import { useQuery } from "@apollo/client";
import { Language } from "../../types/Language";
import { MoviesResponse } from "../../types/movie-api-types/MoviesResponse";
import { GET_MOVIES_BY_FILTERS } from "../../queries-mutations/queries";

const useGetMoviesByFilters = (
  language: Language,
  genreIds: number[],
  minCountVotes: number,
  releaseYear: number,
  page: number
): {
  moviesResponse: MoviesResponse;
  isLoadingMoviesByFilters: boolean;
  refetchMoviesByFilters: () => void;
} => {
  const {
    data: dataMoviesByFilters,
    loading: isLoadingMoviesByFilters,
    refetch: refetchMoviesByFilters,
  } = useQuery(GET_MOVIES_BY_FILTERS, {
    variables: { language, genreIds, minCountVotes, releaseYear, page },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const moviesResponse = dataMoviesByFilters?.getMoviesByFilters;
  return {
    moviesResponse,
    isLoadingMoviesByFilters,
    refetchMoviesByFilters,
  };
};

export default useGetMoviesByFilters;
