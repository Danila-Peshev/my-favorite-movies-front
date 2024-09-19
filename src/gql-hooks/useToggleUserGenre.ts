import { useMutation } from "@apollo/client";
import { TOGGLE_USER_GENRE } from "../queries-mutations/mutations";

const useToggleUserGenre = () => {
  const [toggleUserGenre, { error: errorToggleUserGenre }] =
    useMutation(TOGGLE_USER_GENRE);
  return {
    toggleUserGenre,
    errorToggleUserGenre,
  };
};
export default useToggleUserGenre;
