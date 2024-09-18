import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries-mutations/mutations";

const useLogin = () => {
  const [loginMutation] = useMutation(LOGIN);

  return {
    loginMutation,
  };
};

export default useLogin;
