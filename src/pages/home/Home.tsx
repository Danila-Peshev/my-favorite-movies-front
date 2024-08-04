import GenresBlock from "./GenresBlock";
import { useEffect, useState } from "react";
import { Genre } from "../../types/movie-api-types/Genre";
import {
  getAllGenres,
  getFavoriteMoviesByIds,
} from "../../services/MovieService";
import { useLanguage } from "../../global-components/switch-language/LanguageContext";
import { SimpleMovie } from "../../types/movie-api-types/SimpleMovie";
import { useAuth } from "../../global-components/AuthContext";
import row_view from "../../assets/views-images/row_view.png";
import block_view from "../../assets/views-images/block_view.png";
import MovieBlock from "./MovieBlock";

const Home = () => {
  const { language } = useLanguage();
  const { getFavoriteMoviesId, getWatchedMoviesId } = useAuth();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<SimpleMovie[]>([]);
  const [isBlockView, setIsBlockView] = useState<boolean>(false);

  async function fetchData() {
    setGenres(await getAllGenres(language));
    setFavoriteMovies(
      (
        await getFavoriteMoviesByIds({
          ids: getFavoriteMoviesId(),
          language: language,
        })
      ).results
    );
  }

  useEffect(() => {
    fetchData();
  }, [language]);

  return (
    <div className="w-11/12 mx-auto space-y-3 mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
      <div className="p-5">
        <GenresBlock genres={genres} />
        <div className="w-full mt-5">
          <div className="flex justify-between">
            <span>Your favorites movies:</span>
            <div className="flex space-x-2">
              <button className="text-white bg-blue-800 rounded-sm px-4 py-1">
                add
              </button>
              <button
                className={`bg-blue-800 rounded-sm px-2 ${
                  isBlockView
                    ? "bg-blue-700 text-white"
                    : "bg-gray-500 text-blue-950"
                } hover:bg-blue-950 font-medium rounded-sm`}
                onClick={() => setIsBlockView(false)}
              >
                <img className="h-5 w-8" alt="row" src={row_view} />
              </button>
              <button
                className={`bg-blue-800 rounded-sm px-2 ${
                  isBlockView
                    ? "bg-gray-500 text-blue-950"
                    : "bg-blue-700 text-white"
                } hover:bg-blue-950 font-medium rounded-sm`}
                onClick={() => setIsBlockView(true)}
              >
                <img className="h-5 w-8" alt="row" src={block_view} />
              </button>
            </div>
          </div>
          <div className={isBlockView ? "realtive grid grid-cols-4 gap-x-5 gap-y-5" : ""}>
            {favoriteMovies.map((simpleMovie, index) => (
              <MovieBlock
                simpleMovie={simpleMovie}
                movieNumber={index + 1}
                genres={genres}
                isWatched={getWatchedMoviesId().includes(simpleMovie.id)}
                isBlockView={isBlockView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
