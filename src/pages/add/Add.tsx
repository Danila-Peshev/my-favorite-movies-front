import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { MoviesResponse } from "../../types/movie-api-types/MoviesResponse";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import { getAllGenres, getMoviesByFilters } from "../../services/MovieService";
import { ViewProvider } from "../home/movies-block/switch-view/ViewContext";
import { useTranslation } from "react-i18next";
import { Genre } from "../../types/movie-api-types/Genre";
import GenresBlock from "../home/GenresBlock";
import MoviesBlock from "../home/movies-block/MoviesBlock";
import PaginationBlock from "../home/movies-block/PaginationBlock";
import { MAX_TOTAL_PAGES } from "../../constants/movie_constants";
import {
  MIN_POPULARITY,
  MAX_POPULARITY,
  AVAILABLE_YEARS,
  MAX_RELEASE_YEAR,
} from "../../constants/filter_constants";
import useToggleUserMovie from "../../gql-hooks/useToggleUserMovie";
import useUserGenres from "../../gql-hooks/useUserGenres";
import useUserMovies from "../../gql-hooks/useUserMovies";

const defaultMoviesResponse: MoviesResponse = {
  page: 1,
  results: [],
  totalPages: 1,
  totalResult: 0,
};

type FiltersType = {
  genresId: number[];
  popularity: number;
  releaseYear: number;
};

const Add = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [filters, setFilters] = useState<FiltersType>({
    genresId: [],
    popularity: 0,
    releaseYear: MAX_RELEASE_YEAR,
  });
  const [moviesResponse, setMoviesResponse] = useState(defaultMoviesResponse);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { toggleUserMovie, errorToggleUserMovie } = useToggleUserMovie();
  const { userGenres, isLoadingUserGenres, errorUserGenres } = useUserGenres();
  const {
    userMovies,
    isLoadingUserMovies,
    errorUserMovies,
    refetchUserMovies,
  } = useUserMovies();

  const totalPages = Math.min(moviesResponse.totalPages, MAX_TOTAL_PAGES);

  const handleGenreToggle = (genreId: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genresId: prevFilters.genresId.includes(genreId)
        ? prevFilters.genresId.filter((id) => id !== genreId)
        : [...prevFilters.genresId, genreId],
    }));
  };

  const handleRangeChange = (popularity: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, popularity }));
  };

  const handleYearChange = (releaseYear: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, releaseYear }));
  };

  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      const fetchedGenres = await getAllGenres(language);
      setGenres(fetchedGenres);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const movies = await getMoviesByFilters({
          language,
          page,
          genreIds: filters.genresId,
          releaseYear: filters.releaseYear,
          minCountVotes: filters.popularity,
        });
        setMoviesResponse(movies);
      } else {
        setMoviesResponse(defaultMoviesResponse);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userGenres && !errorUserGenres) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        genresId: userGenres?.getUserGenres.map(
          (genre: { genreId: number }) => genre.genreId
        ),
      }));
    }
  }, [isLoadingUserGenres]);

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, [language]);

  useEffect(() => {
    fetchMovies();
  }, [page, filters.genresId, filters.releaseYear]);

  if (errorUserGenres || errorUserMovies || errorToggleUserMovie) {
    logout();
  }

  if (!user) return null;

  const handleSaveMovieToggle = async (movieId: number) => {
    await toggleUserMovie({ variables: { movieId } });
    await refetchUserMovies();
    fetchMovies();
  };

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        <GenresBlock
          selectedGenres={filters.genresId}
          clickOnGenre={handleGenreToggle}
          genres={genres}
        />
        <span>
          {t("popularity")}: {filters.popularity}
        </span>
        <input
          type="range"
          min={MIN_POPULARITY}
          max={MAX_POPULARITY}
          step={1}
          onChange={(e) => handleRangeChange(Number(e.target.value))}
          onMouseUp={fetchMovies}
          onTouchEnd={fetchMovies}
        />
        <span>
          {t("releaseYear")}: {filters.releaseYear}
        </span>
        <select
          value={filters.releaseYear}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="p-2 border rounded bg-slate-800"
        >
          {AVAILABLE_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {isLoadingUserGenres || isLoadingUserMovies || isLoading ? (
          t("loading")
        ) : (
          <>
            <MoviesBlock
              genres={genres}
              page={moviesResponse.page}
              movies={moviesResponse.results}
              watchedMovies={userMovies.getUserMovies
                .filter((movie: { isWatched: boolean }) => movie.isWatched)
                .map((movie: { movieId: number }) => movie.movieId)}
              showSaveItButton={true}
              onClickSaveIt={handleSaveMovieToggle}
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

export default Add;
