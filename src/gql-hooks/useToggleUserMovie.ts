import { useMutation } from "@apollo/client";
import { TOGGLE_USER_MOVIE } from "../queries-mutations/mutations";
import { GET_USER_MOVIES } from "../queries-mutations/queries";

const useToggleUserMovie = () => {
  const [toggleUserMovie] = useMutation(
    TOGGLE_USER_MOVIE,
    { refetchQueries: [{ query: GET_USER_MOVIES }] }
  );
  return {
    toggleUserMovie
  };
};
export default useToggleUserMovie;
