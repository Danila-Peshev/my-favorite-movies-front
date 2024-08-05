import { FC, useEffect, useState } from "react";
import { Genre } from "../../types/movie-api-types/Genre";
import { useAuth } from "../../global-components/AuthContext";
import ViewSwitcher from "./switch-view/ViewSwitcher";
import { useView } from "./switch-view/ViewContext";
import OneMovie from "./OneMovie";
import PaginationBlock from "./PaginationBlock";
import { MoviesResponse } from "../../types/movie-api-types/MoviesResponse";
import {
  getFavoriteMoviesByIds,
  getMoviesByFilters,
} from "../../services/MovieService";
import { useLanguage } from "../../global-components/switch-language/LanguageContext";
import { MAX_MOVIES_ON_PAGE } from "../../constants/movie_constants";
import { useTranslation } from "react-i18next";

interface MoviesBlockProps {
  genres: Genre[];
  isOnAddedPage: boolean;
}

const MoviesBlock: FC<MoviesBlockProps> = ({ genres, isOnAddedPage }) => {
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, getWatchedMoviesId, getFavoriteMoviesId } = useAuth();
  const { isBlockView } = useView();
  const { language } = useLanguage();
  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    500
  );
  const { t } = useTranslation();

  async function fetchMoviesResponse() {
    setIsLoading(true);
    setError(null);
    try {
      if (isOnAddedPage) {
        const response = await getMoviesByFilters({
          language,
          activePage: page,
        });
        setMoviesResponse(response);
      } else {
        const favoriteMoviesIds = getFavoriteMoviesId();
        if (favoriteMoviesIds.length === 0) {
          setIsLoading(false);
          setMoviesResponse({
            page: 1,
            results: [],
            totalPages: 1,
            totalResult: 0,
          });
          return;
        }
        const response = await getFavoriteMoviesByIds({
          ids: favoriteMoviesIds,
          language,
          page,
        });
        setMoviesResponse(response);
      }
    } catch (err) {
      setError(t("requestError"));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMoviesResponse();
  }, [language, user?.favoriteMoviesId, user?.watchedMoviesId, page]);

  if (isLoading) {
    return <span>{t("loading")}</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  if (!moviesResponse || moviesResponse.results.length === 0) {
    return <span>{t("NotSingleMovieWasFound")}</span>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <span>
          {isOnAddedPage
            ? t("addMoviesToYourFavorite")
            : t("yourFavoriteMovies")}
        </span>
        <div className="flex space-x-2">
          {!isOnAddedPage && (
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
        {moviesResponse.results.map((simpleMovie, index) => (
          <OneMovie
            key={simpleMovie.id}
            simpleMovie={simpleMovie}
            movieNumber={(page - 1) * MAX_MOVIES_ON_PAGE + index + 1}
            genres={genres}
            isWatched={getWatchedMoviesId().includes(simpleMovie.id)}
            isOnAddedPage={isOnAddedPage}
          />
        ))}
      </div>
      <PaginationBlock
        page={moviesResponse.page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default MoviesBlock;
