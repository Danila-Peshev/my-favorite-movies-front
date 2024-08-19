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
  addFavoriteGenreByUserId,
  addWatchedMovieByUserId,
  getFavoriteGenresByUserId,
  getFavoriteMoviesByUserId,
  getWatchedMoviesByUserId,
  removeFavoriteGenreByUserId,
  removeFavoriteMovieByUserId,
  removeWatchedMovieByUserId,
} from "../../services/UserDataService";

const defaultMoviesResponse: MoviesResponse = {
  page: 1,
  results: [],
  totalPages: 1,
  totalResult: 0,
};

const Home = () => {
  const { language } = useLanguage();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>(
    defaultMoviesResponse
  );
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [favoriteGenresId, setFavoriteGenresId] = useState<number[]>([]);

  useEffect(() => {
    fetchGenres();
    fetchFavoriteGenres();
    fetchMoviesResponse();
    fetchWatchedMovies();
  }, [language]);

  useEffect(() => {
    fetchMoviesResponse();
  }, [page]);

  if (!user) {
    return null;
  }

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

  function fetchFavoriteGenres() {
    if (user) {
      setFavoriteGenresId(getFavoriteGenresByUserId(user.id));
    } else {
      setFavoriteGenresId([]);
    }
  }

  const handleClickOnGenre = (genreId: number) => {
    if (favoriteGenresId.includes(genreId)) {
      removeFavoriteGenreByUserId(user.id, genreId);
    } else {
      addFavoriteGenreByUserId(user.id, genreId);
    }

    const updatedFavoriteGenres = getFavoriteGenresByUserId(user.id);
    setFavoriteGenresId(updatedFavoriteGenres);
  };

  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    MAX_TOTAL_PAGES
  );

  async function fetchMoviesResponse() {
    setIsLoading(true);
    try {
      if (user) {
        const movies = await getFavoriteMoviesByIds({
          ids: getFavoriteMoviesByUserId(user.id),
          language,
          page,
        });
        setMoviesResponse(movies);
      } else {
        setMoviesResponse(defaultMoviesResponse);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function fetchWatchedMovies() {
    if (user) {
      setWatchedMovies(getWatchedMoviesByUserId(user.id));
    } else {
      setWatchedMovies([]);
    }
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

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {isLoading ? (
          t("loading")
        ) : (
          <>
            <GenresBlock selectedGenres={favoriteGenresId} clickOnGenre={handleClickOnGenre} genres={genres} />
            <MoviesBlock
              genres={genres}
              page={moviesResponse.page}
              movies={moviesResponse.results}
              watchedMovies={watchedMovies}
              showWatchedAndRemoveButtons
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
