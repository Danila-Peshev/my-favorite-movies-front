import { useQuery } from "@apollo/client";
import { GET_USER_MOVIES } from "../queries-mutations/queries";

const useUserMovies = () => {
  const {
    data: userMovies,
    loading: isLoadingUserMovies,
    error: errorUserMovies,
    refetch: refetchUserMovies,
  } = useQuery(GET_USER_MOVIES, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return {
    userMovies,
    isLoadingUserMovies,
    errorUserMovies,
    refetchUserMovies,
  };
};

export default useUserMovies;
