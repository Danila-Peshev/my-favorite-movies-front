import { FC } from "react";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import { Genre } from "../../../types/movie-api-types/Genre";

interface OneMovieProps {
  movie: SimpleMovie;
  movieNumber: number;
  genres: Genre[];
  isWatched: boolean;
  showAdditionalButtons: boolean;
  isBlockView: boolean;
  onClickWatched: (movieId: number) => void;
  onClickRemove: (movieId: number) => void;
}

const OneMovie: FC<OneMovieProps> = ({
  movie,
  movieNumber,
  isWatched,
  genres,
  showAdditionalButtons,
  isBlockView,
  onClickWatched,
  onClickRemove,
}) => {
  return (
    <div className={isBlockView ? "flex flex-row gap-3" : "flex"}>
      <span className={`text-gray-400 w-auto ${isBlockView ? null : `mr-3`}`}>
        {movieNumber}.
      </span>
      <div
        key={movie.id}
        className={`relative rounded bg-gray-800 text-white p-4 ${
          isBlockView ? `w-80` : `w-full h-auto flex flex-row`
        }`}
      >
        {isWatched ? (
          <div className="absolute rounded inset-0 bg-gray-800 opacity-70 z-10"></div>
        ) : null}
        <img
          className={`rounded ${isBlockView ? null : `relative h-40`}`}
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/w400${movie.posterPath}`}
        />
        <div className={`w-11/12 ${isBlockView ? null : `mx-4`}`}>
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">
            {movie.releaseDate.split("-")[0]}
          </p>
          <p className="text-sm text-gray-300">{movie.overview}</p>
          <div className={`flex flex-wrap ${isBlockView ? `mb-2` : `mt-2`}`}>
            {movie.genreIds.map((genreId) => {
              const genre = genres.find((genre) => genre.id === genreId);
              return (
                <span
                  key={genreId}
                  className={`bg-gray-700 text-sm rounded-full px-2 py-1 mr-2 ${
                    isBlockView ? `mb-2` : null
                  }`}
                >
                  {genre ? genre.name : "Unknown Genre"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {!showAdditionalButtons ? (
        <div
          className={`z-20 space-y-4 ${
            isBlockView ? null : `my-auto ml-3 grid grid-flow-row`
          }`}
        >
          <button
            onClick={() => onClickWatched(movie.id)}
            className={`h-6 w-6 ${
              isWatched ? "bg-green-800 text-white" : "bg-white text-green-900"
            }`}
          >
            ✔
          </button>
          <button
            onClick={() => onClickRemove(movie.id)}
            className="h-6 w-6 bg-red-700 hover:bg-red-950"
          >
            ✖
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OneMovie;
