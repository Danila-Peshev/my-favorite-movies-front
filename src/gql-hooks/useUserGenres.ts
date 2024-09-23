import { useQuery } from "@apollo/client";
import { GET_USER_GENRES } from "../queries-mutations/queries";

const useUserGenres = (): {
  userGenres: number[];
  isLoadingUserGenres: boolean;
  refetchUserGenres: () => void;
} => {
  const {
    data: userGenresData,
    loading: isLoadingUserGenres,
    refetch: refetchUserGenres,
  } = useQuery(GET_USER_GENRES, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const userGenres = (userGenresData?.getUserGenres || []).map(
    (genre: { genreId: number }) => genre.genreId
  );

  return {
    userGenres,
    isLoadingUserGenres,
    refetchUserGenres,
  };
};

export default useUserGenres;
