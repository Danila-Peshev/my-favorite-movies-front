import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../queries-mutations/mutations";
import { GET_USER } from "../queries-mutations/queries";

const useLogin = () => {
  const [loginMutation] = useMutation(LOGIN);
  const {
    data: dataGetUser,
    loading: isLoadingGetUser,
    error: errorGetUser,
    refetch: refetchGetUser,
  } = useQuery(GET_USER, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  return {
    loginMutation,
    dataGetUser,
    isLoadingGetUser,
    errorGetUser,
    refetchGetUser,
  };
};

export default useLogin;
