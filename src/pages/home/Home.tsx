import GenresBlock from "./GenresBlock";
import { useEffect, useState } from "react";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import MoviesBlock from "./movies-block/MoviesBlock";
import { ViewProvider } from "./movies-block/switch-view/ViewContext";
import { useTranslation } from "react-i18next";
import { MAX_TOTAL_PAGES } from "../../constants/movie_constants";
import PaginationBlock from "./movies-block/PaginationBlock";
import useToggleUserGenre from "../../gql-hooks/user-data/useToggleUserGenre";
import useToggleUserMovie from "../../gql-hooks/user-data/useToggleUserMovie";
import useToggleWatchMovie from "../../gql-hooks/user-data/useToggleWatchMovie";
import useUserGenres from "../../gql-hooks/user-data/useUserGenres";
import useUserMovies from "../../gql-hooks/user-data/useUserMovies";
import useGetAllGenres from "../../gql-hooks/movies-data/useGetAllGenres";
import useGetFavoriteMoviesByIds from "../../gql-hooks/movies-data/useGetFavoriteMoviesByIds";

const Home = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation();
  const { toggleUserGenre } = useToggleUserGenre();
  const { toggleUserMovie } = useToggleUserMovie();
  const { toggleWatchMovie } = useToggleWatchMovie();
  const { userGenres, isLoadingUserGenres } = useUserGenres();
  const { userMovies, watchedUserMovies, isLoadingUserMovies } =
    useUserMovies();
  const { genres, isLoadingGetAllGenres, refetchAllGenres } =
    useGetAllGenres(language);

  const {
    moviesResponse,
    isLoadingFavoriteMoviesByIds,
    refetchFavoriteMoviesByIds,
  } = useGetFavoriteMoviesByIds(userMovies, language, page);

  useEffect(() => {
    refetchAllGenres();
    refetchFavoriteMoviesByIds();
  }, [language]);

  useEffect(() => {
    refetchFavoriteMoviesByIds();
  }, [page]);

  const handleClickWatched = async (movieId: number) => {
    await toggleWatchMovie({ variables: { movieId } });
  };

  const handleClickRemove = async (movieId: number) => {
    await toggleUserMovie({ variables: { movieId } });
  };

  const handleClickOnGenre = async (genreId: number) => {
    await toggleUserGenre({ variables: { genreId } });
  };

  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    MAX_TOTAL_PAGES
  );

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {isLoadingUserGenres ||
        isLoadingUserMovies ||
        isLoadingFavoriteMoviesByIds ||
        isLoadingGetAllGenres ? (
          t("loading")
        ) : (
          <>
            <GenresBlock
              selectedGenres={userGenres}
              clickOnGenre={handleClickOnGenre}
              genres={genres}
            />
            <MoviesBlock
              genres={genres}
              page={moviesResponse.page}
              movies={moviesResponse.results}
              watchedMovies={watchedUserMovies}
              showWatchedAndRemoveButtons
              onClickRemove={(movieId) => handleClickRemove(movieId)}
              onClickWatched={(movieId) => handleClickWatched(movieId)}
            />
            <PaginationBlock
              page={page}
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
