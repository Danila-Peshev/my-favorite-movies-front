import { useMutation } from "@apollo/client";
import { TOGGLE_USER_GENRE } from "../queries-mutations/mutations";
import { GET_USER_GENRES } from "../queries-mutations/queries";

const useToggleUserGenre = () => {
  const [toggleUserGenre] = useMutation(
    TOGGLE_USER_GENRE,
    { refetchQueries: [{ query: GET_USER_GENRES }] }
  );
  return {
    toggleUserGenre
  };
};
export default useToggleUserGenre;
