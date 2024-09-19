import { useMutation } from "@apollo/client";
import { TOGGLE_USER_MOVIE } from "../queries-mutations/mutations";

const useToggleUserMovie = () => {
  const [toggleUserMovie, { error: errorToggleUserMovie }] =
    useMutation(TOGGLE_USER_MOVIE);
  return {
    toggleUserMovie,
    errorToggleUserMovie,
  };
};
export default useToggleUserMovie;
