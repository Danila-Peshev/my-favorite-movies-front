import GenresBlock from "./GenresBlock";
import { useEffect, useState } from "react";
import { Genre } from "../../types/movie-api-types/Genre";
import { getAllGenres, getFavoriteMoviesByIds, getMoviesByFilters } from "../../services/MovieService";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import MoviesBlock from "./movies-block/MoviesBlock";
import { ViewProvider } from "./movies-block/switch-view/ViewContext";
import { useTranslation } from "react-i18next";
import { MoviesResponse } from "../../types/movie-api-types/MoviesResponse";
import { MAX_TOTAL_PAGES } from "../../constants/movie_constants";
import PaginationBlock from "./movies-block/PaginationBlock";
import { useAuth } from "../../components/AuthContext";
import { useUser } from "../../components/UserContext";

const Home = () => {
  const { language } = useLanguage();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState({
    loadingGenres: true,
    errorGenres: false,
    loadingMovies: true,
    errorMovies: false,
  });
  const { getFavoriteMoviesId } = useUser();
  const { t } = useTranslation();

  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    MAX_TOTAL_PAGES
  );

  async function fetchMoviesResponse() {
    setStatus((prevStatus) => ({ ...prevStatus, loadingMovies: true, errorMovies: false }));
    try {
      const movies = await getFavoriteMoviesByIds({ids: getFavoriteMoviesId(), language, page });
      setMoviesResponse(movies);
    } catch (err) {
      setStatus((prevStatus) => ({ ...prevStatus, errorMovies: true }));
    } finally {
      setStatus((prevStatus) => ({ ...prevStatus, loadingMovies: false }));
    }
  }

  async function fetchGenres() {
    setStatus((prevStatus) => ({ ...prevStatus, loadingGenres: true, errorGenres: false }));
    try {
      const fetchedGenres = await getAllGenres(language);
      setGenres(fetchedGenres);
    } catch (err) {
      setStatus((prevStatus) => ({ ...prevStatus, errorGenres: true }));
    } finally {
      setStatus((prevStatus) => ({ ...prevStatus, loadingGenres: false }));
    }
  }

  useEffect(() => {
    fetchGenres();
    fetchMoviesResponse();
  }, [language]);

  useEffect(() => {
    fetchMoviesResponse();
  }, [page, user?.favoriteMoviesId]);

  const { loadingGenres, errorGenres, loadingMovies, errorMovies } = status;

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {(loadingGenres || loadingMovies) ? (
          t("loading")
        ) : (errorGenres || errorMovies) ? (
          t("requestError")
        ) : (
          <>
            <GenresBlock genres={genres} />
            {moviesResponse ? (
              <>
              <MoviesBlock genres={genres} page={moviesResponse.page} movies={moviesResponse.results} showAdditionalButtons={false} />
              <PaginationBlock page={moviesResponse.page} totalPages={totalPages} setPage={setPage}/>
              </>
            ) : <span>{t("loading")}</span>}
          </>
        )}
      </div>
    </ViewProvider>
  );
};

export default Home;