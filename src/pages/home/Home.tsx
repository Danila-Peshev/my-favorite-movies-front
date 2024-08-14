import GenresBlock from "./GenresBlock";
import { useEffect, useState } from "react";
import { Genre } from "../../types/movie-api-types/Genre";
import {
  getAllGenres,
  getFavoriteMoviesByIds,
} from "../../services/MovieService";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import MoviesBlock from "./movies-block/MoviesBlock";
import { ViewProvider } from "./movies-block/switch-view/ViewContext";
import { useTranslation } from "react-i18next";
import { MoviesResponse } from "../../types/movie-api-types/MoviesResponse";
import { MAX_TOTAL_PAGES } from "../../constants/movie_constants";
import PaginationBlock from "./movies-block/PaginationBlock";
import { useAuth } from "../../components/AuthContext";
import {
  addWatchedMovieByUserId,
  getFavoriteMoviesByUserId,
  getWatchedMoviesByUserId,
  removeFavoriteMovieByUserId,
  removeWatchedMovieByUserId,
} from "../../services/UserDataService";

const Home = () => {
  const { language } = useLanguage();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>({
    page: 1,
    results: [],
    totalPages: 1,
    totalResult: 0,
  });
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const handleClickWatched = (movieId: number) => {
    if (watchedMovies.includes(movieId)) {
      removeWatchedMovieByUserId(user.id, movieId);
    } else {
      addWatchedMovieByUserId(user.id, movieId);
    }
    fetchWatchedMovies();
    fetchMoviesResponse();
  };

  const handleClickRemove = (movieId: number) => {
    removeFavoriteMovieByUserId(user.id, movieId);
    fetchMoviesResponse();
  };

  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    MAX_TOTAL_PAGES
  );

  async function fetchMoviesResponse() {
    setIsLoading(true);
    try {
      const movies = await getFavoriteMoviesByIds({
        ids: getFavoriteMoviesByUserId(user.id),
        language,
        page,
      });
      setMoviesResponse(movies);
    } finally {
      setIsLoading(false);
    }
  }

  function fetchWatchedMovies() {
    setWatchedMovies(getWatchedMoviesByUserId(user.id));
  }

  async function fetchGenres() {
    setIsLoading(true);
    try {
      const fetchedGenres = await getAllGenres(language);
      setGenres(fetchedGenres);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGenres();
    fetchMoviesResponse();
    fetchWatchedMovies();
  }, [language]);

  useEffect(() => {
    fetchMoviesResponse();
  }, [page]);

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {isLoading ? (
          t("loading")
        ) : (
          <>
            <GenresBlock genres={genres} />
            <MoviesBlock
              genres={genres}
              page={moviesResponse.page}
              movies={moviesResponse.results}
              watchedMovies={watchedMovies}
              showAdditionalButtons={false}
              onClickRemove={(movieId) => handleClickRemove(movieId)}
              onClickWatched={(movieId) => handleClickWatched(movieId)}
            />
            <PaginationBlock
              page={moviesResponse.page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}
      </div>
    </ViewProvider>
  );
};

export default Home;
