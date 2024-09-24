import { FC } from "react";
import { Genre } from "../../../types/movie-api-types/Genre";
import ViewSwitcher from "./switch-view/ViewSwitcher";
import { useView } from "./switch-view/ViewContext";
import { MAX_MOVIES_ON_PAGE } from "../../../constants/movie_constants";
import { useTranslation } from "react-i18next";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import OneMovie from "./OneMovie";
import { Link } from "react-router-dom";
import useUserMovies from "../../../gql-hooks/user-data/useUserMovies";

interface MoviesBlockProps {
  genres: Genre[];
  page: number;
  movies: SimpleMovie[];
  watchedMovies: number[];
  showWatchedAndRemoveButtons?: boolean;
  showSaveItButton?: boolean;
  onClickWatched?: (movieId: number) => void;
  onClickRemove?: (movieId: number) => void;
  onClickSaveIt?: (movieId: number) => void;
}

const MoviesBlock: FC<MoviesBlockProps> = ({
  genres,
  page,
  movies,
  watchedMovies,
  showWatchedAndRemoveButtons = false,
  showSaveItButton = false,
  onClickWatched = (): void => {},
  onClickRemove = (): void => {},
  onClickSaveIt = (): void => {},
}) => {
  const { isBlockView } = useView();
  const { t } = useTranslation();
  const { userMovies, isLoadingUserMovies } = useUserMovies();

  if (isLoadingUserMovies) {
    return <span>Loading...</span>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <span>
          {showWatchedAndRemoveButtons
            ? t("yourFavoriteMovies")
            : t("addMoviesToYourFavorite")}
        </span>
        <div className="flex space-x-2">
          {showWatchedAndRemoveButtons && (
            <Link to="/add">
              <button className="text-white bg-blue-800 rounded-sm px-4 py-1">
                {t("add")}
              </button>
            </Link>
          )}
          <ViewSwitcher />
        </div>
      </div>
      <div
        className={
          isBlockView
            ? "relative grid grid-cols-4 gap-x-5 gap-y-5 mt-5"
            : "relative grid grid-flow-row gap-y-5 mt-5"
        }
      >
        {movies.length
          ? movies.map((simpleMovie, index) => (
              <OneMovie
                key={simpleMovie.id}
                movie={simpleMovie}
                movieNumber={(page - 1) * MAX_MOVIES_ON_PAGE + index + 1}
                genres={genres}
                isWatched={watchedMovies.includes(simpleMovie.id)}
                isSaved={userMovies.includes(simpleMovie.id)}
                showWatchedAndRemoveButtons={showWatchedAndRemoveButtons}
                showSaveItButton={showSaveItButton}
                isBlockView={isBlockView}
                onClickWatched={onClickWatched}
                onClickRemove={onClickRemove}
                onClickSaveIt={onClickSaveIt}
              />
            ))
          : t("notSingleMovieWasFound")}
      </div>
    </div>
  );
};

export default MoviesBlock;
