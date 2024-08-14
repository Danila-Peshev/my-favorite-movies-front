import { FC } from "react";
import { Genre } from "../../../types/movie-api-types/Genre";
import ViewSwitcher from "./switch-view/ViewSwitcher";
import { useView } from "./switch-view/ViewContext";
import { MAX_MOVIES_ON_PAGE } from "../../../constants/movie_constants";
import { useTranslation } from "react-i18next";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import OneMovie from "./OneMovie";

interface MoviesBlockProps {
  genres: Genre[];
  page: number;
  movies: SimpleMovie[];
  watchedMovies: number[];
  showAdditionalButtons: boolean;
  onClickWatched: (movieId: number) => void;
  onClickRemove: (movieId: number) => void;
}

const MoviesBlock: FC<MoviesBlockProps> = ({
  genres,
  page,
  movies,
  watchedMovies,
  showAdditionalButtons,
  onClickWatched,
  onClickRemove,
}) => {
  const { isBlockView } = useView();
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <span>
          {showAdditionalButtons
            ? t("addMoviesToYourFavorite")
            : t("yourFavoriteMovies")}
        </span>
        <div className="flex space-x-2">
          {!showAdditionalButtons && (
            <button className="text-white bg-blue-800 rounded-sm px-4 py-1">
              {t("add")}
            </button>
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
        {movies.map((simpleMovie, index) => (
          <OneMovie
            key={simpleMovie.id}
            movie={simpleMovie}
            movieNumber={(page - 1) * MAX_MOVIES_ON_PAGE + index + 1}
            genres={genres}
            isWatched={watchedMovies.includes(simpleMovie.id)}
            showAdditionalButtons={showAdditionalButtons}
            isBlockView={isBlockView}
            onClickWatched={onClickWatched}
            onClickRemove={onClickRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesBlock;
