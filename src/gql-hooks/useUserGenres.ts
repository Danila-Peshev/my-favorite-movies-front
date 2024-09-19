import { useQuery } from "@apollo/client";
import { GET_USER_GENRES } from "../queries-mutations/queries";

const useUserGenres = () => {
  const {
    data: userGenres,
    loading: isLoadingUserGenres,
    error: errorUserGenres,
    refetch: refetchUserGenres,
  } = useQuery(GET_USER_GENRES, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return {
    userGenres,
    isLoadingUserGenres,
    errorUserGenres,
    refetchUserGenres,
  };
};

export default useUserGenres;
