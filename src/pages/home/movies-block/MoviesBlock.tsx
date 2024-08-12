import { FC, useState } from "react";
import { Genre } from "../../../types/movie-api-types/Genre";
import ViewSwitcher from "./switch-view/ViewSwitcher";
import { useView } from "./switch-view/ViewContext";
import { MAX_MOVIES_ON_PAGE, MAX_TOTAL_PAGES } from "../../../constants/movie_constants";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../components/UserContext";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import BlockViewOneMovie from "./BlockViewOneMovie";
import RowViewOneMovie from "./RowViewOneMovie";

interface MoviesBlockProps {
  genres: Genre[];
  page: number;
  movies: SimpleMovie[];
  showAdditionalButtons: boolean;
}

const MoviesBlock: FC<MoviesBlockProps> = ({ genres, page, movies, showAdditionalButtons }) => {
  const { getWatchedMoviesId } = useUser();
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
          isBlockView ? "relative grid grid-cols-4 gap-x-5 gap-y-5 mt-5" : ""
        }
      >
        {movies.map((simpleMovie, index) => (
          isBlockView ? 
          <BlockViewOneMovie
            key={simpleMovie.id}
            movie={simpleMovie}
            movieNumber={(page - 1) * MAX_MOVIES_ON_PAGE + index + 1}
            genres={genres}
            isWatched={getWatchedMoviesId().includes(simpleMovie.id)}
            showAdditionalButtons={showAdditionalButtons}
          /> : 
          <RowViewOneMovie
            key={simpleMovie.id}
            movie={simpleMovie}
            movieNumber={(page - 1) * MAX_MOVIES_ON_PAGE + index + 1}
            genres={genres}
            isWatched={getWatchedMoviesId().includes(simpleMovie.id)}
            showAdditionalButtons={showAdditionalButtons}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesBlock;
