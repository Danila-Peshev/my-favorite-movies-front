import { useMutation } from "@apollo/client";
import { TOGGLE_WATCH_MOVIE } from "../queries-mutations/mutations";
import { GET_USER_MOVIES } from "../queries-mutations/queries";

const useToggleWatchMovie = () => {
  const [toggleWatchMovie] = useMutation(
    TOGGLE_WATCH_MOVIE,
    { refetchQueries: [{ query: GET_USER_MOVIES }] }
  );
  return {
    toggleWatchMovie,
  };
};
export default useToggleWatchMovie;
