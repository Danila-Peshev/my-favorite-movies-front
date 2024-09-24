import { useQuery } from "@apollo/client";
import { GET_ALL_GENRES } from "../../queries-mutations/queries";
import { Genre } from "../../types/movie-api-types/Genre";
import { Language } from "../../types/Language";

const useGetAllGenres = (
  language: Language
): {
  genres: Genre[] | [];
  isLoadingGetAllGenres: boolean;
  refetchAllGenres: () => void;
} => {
  const {
    data: dataGetAllGenres,
    loading: isLoadingGetAllGenres,
    refetch: refetchAllGenres,
  } = useQuery(GET_ALL_GENRES, {
    variables: { language },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const genres = dataGetAllGenres?.getAllGenres || [];

  return {
    genres,
    isLoadingGetAllGenres,
    refetchAllGenres,
  };
};

export default useGetAllGenres;
