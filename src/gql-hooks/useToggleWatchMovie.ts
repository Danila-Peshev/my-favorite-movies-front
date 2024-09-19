import { useMutation } from "@apollo/client";
import { TOGGLE_WATCH_MOVIE } from "../queries-mutations/mutations";

const useToggleWatchMovie = () => {
  const [toggleWatchMovie, { error: errorToggleWatchMovie }] =
    useMutation(TOGGLE_WATCH_MOVIE);
  return {
    toggleWatchMovie,
    errorToggleWatchMovie,
  };
};
export default useToggleWatchMovie;
