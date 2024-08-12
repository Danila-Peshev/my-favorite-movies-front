import { FC } from "react";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import { Genre } from "../../../types/movie-api-types/Genre";
import { useUser } from "../../../components/UserContext";

interface RowViewOneMovieProps {
  movie: SimpleMovie;
  movieNumber: number;
  genres: Genre[];
  isWatched: boolean;
  showAdditionalButtons: boolean;
}

const RowViewOneMovie: FC<RowViewOneMovieProps> = ({movie, movieNumber, isWatched, genres, showAdditionalButtons}) => {
  const { addWatchedMovie, removeWatchedMovie, removeFavoriteMovie } =
    useUser();
  const handleClickWatched = () => {
    if (isWatched) {
      removeWatchedMovie(movie.id);
    } else {
      addWatchedMovie(movie.id);
    }
  };

  return (
    <div
      key={movie.id}
      className="relative rounded h-auto bg-gray-800 text-white my-5 p-4 flex items-start gap-4"
    >
      {isWatched ? (
        <div className="absolute inset-0 bg-gray-800 opacity-70 z-10"></div>
      ) : null }
      <span className="text-gray-400">{movieNumber}.</span>
      <img
        className="w-24 h-auto rounded"
        alt={movie.title}
        src={`https://image.tmdb.org/t/p/w400${movie.posterPath}`}
      />
      <div className="w-11/12">
        <h3 className="text-xl font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          {movie.releaseDate.split("-")[0]}
        </p>
        <p className="text-sm text-gray-300">{movie.overview}</p>
        <div className="my-2">
          {movie.genreIds.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return (
              <span
                key={genreId}
                className="bg-gray-700 text-sm rounded-full px-2 py-1 mr-2 mb-2"
              >
                {genre ? genre.name : null}
              </span>
            );
          })}
        </div>
      </div>
      {showAdditionalButtons ? (
        null
      ) : (
        <>
          <div className="my-auto z-20">
            <button
              onClick={handleClickWatched}
              className={`h-6 w-6 ${
                isWatched
                  ? "bg-green-800 text-white"
                  : "bg-white text-green-900"
              }`}
            >
              ✔
            </button>
          </div>
          <div className="my-auto z-20">
            <button
              onClick={() => removeFavoriteMovie(movie.id)}
              className="h-6 w-6 bg-red-700 hover:bg-red-950"
            >
              ✖
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RowViewOneMovie;