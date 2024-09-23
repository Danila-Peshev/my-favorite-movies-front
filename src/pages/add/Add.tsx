import { useEffect, useState } from "react";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import { ViewProvider } from "../home/movies-block/switch-view/ViewContext";
import { useTranslation } from "react-i18next";
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
import useToggleUserMovie from "../../gql-hooks/user-data/useToggleUserMovie";
import useUserGenres from "../../gql-hooks/user-data/useUserGenres";
import useUserMovies from "../../gql-hooks/user-data/useUserMovies";
import useGetAllGenres from "../../gql-hooks/movies-data/useGetAllGenres";
import useGetMoviesByFilters from "../../gql-hooks/movies-data/useGetMoviesByFilters";

type FiltersType = {
  genresId: number[];
  popularity: number;
  releaseYear: number;
};

const Add = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [filters, setFilters] = useState<FiltersType>({
    genresId: [],
    popularity: 0,
    releaseYear: MAX_RELEASE_YEAR,
  });
  const [page, setPage] = useState<number>(1);
  const { toggleUserMovie } = useToggleUserMovie();
  const { userGenres, isLoadingUserGenres } = useUserGenres();
  const { watchedUserMovies, isLoadingUserMovies } = useUserMovies();
  const { genres, isLoadingGetAllGenres, refetchAllGenres } =
    useGetAllGenres(language);
  const { moviesResponse, isLoadingMoviesByFilters, refetchMoviesByFilters } =
    useGetMoviesByFilters(
      language,
      filters.genresId,
      filters.popularity,
      filters.releaseYear,
      page
    );

  const totalPages = Math.min(
    moviesResponse ? moviesResponse.totalPages : 1,
    MAX_TOTAL_PAGES
  );

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

  useEffect(() => {
    if (userGenres) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        genresId: userGenres,
      }));
    }
  }, [isLoadingUserGenres]);

  useEffect(() => {
    refetchAllGenres();
    refetchMoviesByFilters();
  }, [language]);

  useEffect(() => {
    refetchMoviesByFilters();
  }, [page, filters.genresId, filters.releaseYear]);

  const handleSaveMovieToggle = async (movieId: number) => {
    await toggleUserMovie({ variables: { movieId } });
  };

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {isLoadingUserGenres ||
        isLoadingUserMovies ||
        isLoadingGetAllGenres ||
        isLoadingMoviesByFilters ? (
          t("loading")
        ) : (
          <>
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
              onMouseUp={() => refetchMoviesByFilters()}
              onTouchEnd={() => refetchMoviesByFilters()}
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
            <MoviesBlock
              genres={genres}
              page={moviesResponse.page}
              movies={moviesResponse.results}
              watchedMovies={watchedUserMovies}
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
