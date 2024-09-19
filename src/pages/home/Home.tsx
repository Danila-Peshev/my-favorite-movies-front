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
import useToggleUserGenre from "../../gql-hooks/useToggleUserGenre";
import useToggleUserMovie from "../../gql-hooks/useToggleUserMovie";
import useToggleWatchMovie from "../../gql-hooks/useToggleWatchMovie";
import useUserGenres from "../../gql-hooks/useUserGenres";
import useUserMovies from "../../gql-hooks/useUserMovies";

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
  const { user, logout } = useAuth();
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation();
  const { toggleUserGenre, errorToggleUserGenre } = useToggleUserGenre();
  const { toggleUserMovie, errorToggleUserMovie } = useToggleUserMovie();
  const { toggleWatchMovie, errorToggleWatchMovie } = useToggleWatchMovie();
  const {
    userGenres,
    isLoadingUserGenres,
    errorUserGenres,
    refetchUserGenres,
  } = useUserGenres();
  const {
    userMovies,
    isLoadingUserMovies,
    errorUserMovies,
    refetchUserMovies,
  } = useUserMovies();

  useEffect(() => {
    fetchGenres();
    fetchMoviesResponse();
  }, [language]);

  useEffect(() => {
    fetchMoviesResponse();
  }, [page, isLoadingUserMovies]);

  if (
    errorUserGenres ||
    errorUserMovies ||
    errorToggleUserGenre ||
    errorToggleUserMovie ||
    errorToggleWatchMovie
  ) {
    logout();
  }

  if (!user) {
    return null;
  }

  const handleClickWatched = async (movieId: number) => {
    await toggleWatchMovie({ variables: { movieId } });
    await refetchUserMovies();
    fetchMoviesResponse();
  };

  const handleClickRemove = async (movieId: number) => {
    await toggleUserMovie({ variables: { movieId } });
    await refetchUserMovies();
    fetchMoviesResponse();
  };

  const handleClickOnGenre = async (genreId: number) => {
    await toggleUserGenre({ variables: { genreId } });
    await refetchUserGenres();
  };

  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    MAX_TOTAL_PAGES
  );

  async function fetchMoviesResponse() {
    if (user && !isLoadingUserMovies) {
      const movies = await getFavoriteMoviesByIds({
        ids: userMovies.getUserMovies.map(
          (movie: { movieId: number }) => movie.movieId
        ),
        language,
        page,
      });
      setMoviesResponse(movies);
    }
  }

  async function fetchGenres() {
    const fetchedGenres = await getAllGenres(language);
    setGenres(fetchedGenres);
  }

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {isLoadingUserGenres || isLoadingUserMovies ? (
          t("loading")
        ) : (
          <>
            <GenresBlock
              selectedGenres={userGenres?.getUserGenres.map(
                (genre: { genreId: number }) => genre.genreId
              )}
              clickOnGenre={handleClickOnGenre}
              genres={genres}
            />
            <MoviesBlock
              genres={genres}
              page={moviesResponse.page}
              movies={moviesResponse.results}
              watchedMovies={userMovies.getUserMovies
                .filter((movie: { isWatched: boolean }) => movie.isWatched)
                .map((movie: { movieId: number }) => movie.movieId)}
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
