import { FC } from "react";
import { useAuth } from "../../global-components/AuthContext";
import { Genre } from "../../types/movie-api-types/Genre";
import { SimpleMovie } from "../../types/movie-api-types/SimpleMovie";

interface MovieBlockProps {
  simpleMovie: SimpleMovie;
  genres: Genre[];
  movieNumber: number;
  isWatched: boolean;
  isBlockView: boolean;
}

const MovieBlock: FC<MovieBlockProps> = ({
  simpleMovie,
  genres,
  movieNumber,
  isWatched,
  isBlockView
}) => {
  const { user, addWatchedMovie, removeWatchedMovie } = useAuth();

  const handleClickWatched = () => {
    if (user) {
      if (isWatched) {
        removeWatchedMovie(simpleMovie.id);
      } else {
        addWatchedMovie(simpleMovie.id);
      }
    }
  }

  if (isBlockView) {
    return(
      <div className="flex flex-row gap-3">
        <span className="text-gray-400 w-5">{movieNumber}.</span>
    <div
      key={simpleMovie.id}
      className="relative rounded bg-gray-800 text-white p-4 w-80"
    >
      {isWatched ? <div className="absolute rounded inset-0 bg-gray-800 opacity-70 z-10"></div> : <></>}
      <img
        className="rounded"
        alt={simpleMovie.title}
        src={`https://image.tmdb.org/t/p/w400${simpleMovie.posterPath}`}
      />
      <div className="w-11/12">
          <h3 className="text-xl font-semibold">{simpleMovie.title}</h3>
          <p className="text-sm text-gray-400">
            {simpleMovie.releaseDate.split("-")[0]}
          </p>
          <p className="text-sm text-gray-300">{simpleMovie.overview}</p>
          <div className="flex flex-wrap my-2">
            {simpleMovie.genreIds.map((genreId) => {
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
    <div className="z-20 space-y-4">
          <button
          onClick={handleClickWatched} className={`h-6 w-6 ${
          isWatched ? "bg-green-800 text-white" : "bg-white text-green-900"
        }`}>
            ✔
          </button>
          <button className="h-6 w-6 bg-red-700 hover:bg-red-950">✖</button>
        </div>
    </div>
    );
  } else {
    return (
      <div
        key={simpleMovie.id}
        className="relative rounded h-auto bg-gray-800 text-white my-3 p-4 flex items-start gap-4"
      >
        {isWatched ? <div className="absolute inset-0 bg-gray-800 opacity-70 z-10"></div> : <></>}
        <span className="text-gray-400">{movieNumber}.</span>
        <img
          className="w-24 h-auto rounded"
          alt={simpleMovie.title}
          src={`https://image.tmdb.org/t/p/w200${simpleMovie.posterPath}`}
        />
        <div className="w-11/12">
          <h3 className="text-xl font-semibold">{simpleMovie.title}</h3>
          <p className="text-sm text-gray-400">
            {simpleMovie.releaseDate.split("-")[0]}
          </p>
          <p className="text-sm text-gray-300">{simpleMovie.overview}</p>
          <div className="my-2">
            {simpleMovie.genreIds.map((genreId) => {
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
        <div className="my-auto z-20">
          <button
          onClick={handleClickWatched} className={`h-6 w-6 ${
          isWatched ? "bg-green-800 text-white" : "bg-white text-green-900"
        }`}>
            ✔
          </button>
        </div>
        <div className="my-auto z-20">
          <button className="h-6 w-6 bg-red-700 hover:bg-red-950">✖</button>
        </div>
      </div>
    );
  }
};

export default MovieBlock;