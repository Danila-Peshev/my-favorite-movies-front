import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries-mutations/queries";

const useGetUser = () => {
  const {
    data: dataGetUser,
    loading: isLoadingGetUser,
    error: errorGetUser,
    refetch: refetchGetUser,
  } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return {
    dataGetUser,
    isLoadingGetUser,
    errorGetUser,
    refetchGetUser,
  };
};

export default useGetUser;
