import { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { useTranslation } from "react-i18next";
import { Movie } from "../../types/movie-api-types/Movie";
import { getAllGenres, getMoviesByGenres } from "../../services/MovieService";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import { Genre } from "../../types/movie-api-types/Genre";
import { Link } from "react-router-dom";

const Home = () => {
  const { logout, user } = useAuth();
  const { t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const { activeLanguage } = useLanguage();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activePage, setActivePage] = useState<number>(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenres, setActiveGenres] = useState<Genre[]>([]);

  async function fetchGenres() {
    const genres = await getAllGenres(activeLanguage);
    setGenres(genres);
  }

  async function fetchMovies() {
    const moviesResponse = await getMoviesByGenres(
      activeGenres.map(genre => genre.id),
      activePage,
      activeLanguage
    );
    setMovies(moviesResponse.results);
    setTotalPages(moviesResponse.total_pages);
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [activeLanguage, activePage]);

  useEffect(() => {
    setActivePage(1);
    fetchMovies();
  }, [activeGenres]);

  const handleClickOnGenre = (genre: Genre) => {
    if (activeGenres.includes(genre)) {
      setActiveGenres(currentState => currentState.filter(item => item.id !== genre.id));
    } else {
      setActiveGenres([...activeGenres, genre]);
    }
  };

  return (
    <div className="w-full text-center mt-96">
      <h1 className="text-4xl font-bold">
        {t("welcome", { user: user?.email })}
      </h1>
      <div className="mt-10">
        <button
          onClick={() => logout()}
          className="border-2 border-black rounded w-20 
          hover:bg-black hover:border-gray-300 hover:text-white"
        >
          {t("logout")}
        </button>
      </div>
      <div className="mt-11">
        {genres.map((genre) => (
          <button
            className={`w-auto px-4 py-1 ${
              activeGenres.includes(genre)
                ? "text-black bg-white border border-blue-800"
                : "text-white bg-blue-800"
            } mx-1 my-1 rounded`}
            onClick={() => handleClickOnGenre(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="mt-14 w-11/12 mx-auto flex flex-wrap">
        {movies.map((movie) => (
          <Link key={movie.id} className="w-80 mx-auto mb-7" to={`/movie/${movie.id}`}>
            <span className="text-2xl w-64">
              {movie.title} ({movie.release_date.split("-")[0]})
            </span>
            <img
              className="mt-1 mx-auto"
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            />
          </Link>
        ))}
      </div>
      <div>
        {Array.from(Array(totalPages > 100 ? 100 : totalPages), (_, i) => i + 1).map((num) => (
          <button
            className={`w-12 ${
              activePage === num
                ? "text-black bg-white border border-blue-800"
                : "text-white bg-blue-800"
            } mx-1 my-1 rounded`}
            onClick={() => setActivePage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
