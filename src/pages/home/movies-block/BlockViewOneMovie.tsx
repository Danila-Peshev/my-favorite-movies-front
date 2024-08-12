import { FC } from "react";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import { Genre } from "../../../types/movie-api-types/Genre";
import { useUser } from "../../../components/UserContext";

interface BlockViewOneMovieProps {
  movie: SimpleMovie;
  movieNumber: number;
  genres: Genre[];
  isWatched: boolean;
  showAdditionalButtons: boolean;
}

const BlockViewOneMovie: FC<BlockViewOneMovieProps> = ({movie, movieNumber, isWatched, genres, showAdditionalButtons}) => {
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
    <div className="flex flex-row gap-3">
      <span className="text-gray-400 w-5">{movieNumber}.</span>
      <div
        key={movie.id}
        className="relative rounded bg-gray-800 text-white p-4 w-80"
      >
        {isWatched ? (
          <div className="absolute rounded inset-0 bg-gray-800 opacity-70 z-10"></div>
        ) : null}
        <img
          className="rounded"
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/w400${movie.posterPath}`}
        />
        <div className="w-11/12">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">
            {movie.releaseDate.split("-")[0]}
          </p>
          <p className="text-sm text-gray-300">{movie.overview}</p>
          <div className="flex flex-wrap my-2">
            {movie.genreIds.map((genreId) => {
              const genre = genres.find((genre) => genre.id === genreId);
              return (
                <span
                  key={genreId}
                  className="bg-gray-700 text-sm rounded-full px-2 py-1 mr-2 mb-2"
                >
                  {genre ? genre.name : "Unknown Genre"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {showAdditionalButtons ? (
        null
      ) : (
        <div className="z-20 space-y-4">
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
          <button
            onClick={() => removeFavoriteMovie(movie.id)}
            className="h-6 w-6 bg-red-700 hover:bg-red-950"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
}

export default BlockViewOneMovie;