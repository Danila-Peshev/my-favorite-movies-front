import { FC } from "react";
import { SimpleMovie } from "../../../types/movie-api-types/SimpleMovie";
import { Genre } from "../../../types/movie-api-types/Genre";
import { useTranslation } from "react-i18next";

interface OneMovieProps {
  movie: SimpleMovie;
  movieNumber: number;
  genres: Genre[];
  isWatched: boolean;
  isSaved: boolean;
  showWatchedAndRemoveButtons?: boolean;
  showSaveItButton?: boolean;
  isBlockView: boolean;
  onClickWatched?: (movieId: number) => void;
  onClickRemove?: (movieId: number) => void;
  onClickSaveIt?: (movieId: number) => void;
}

const OneMovie: FC<OneMovieProps> = ({
  movie,
  movieNumber,
  isWatched,
  isSaved,
  genres,
  showWatchedAndRemoveButtons = false,
  showSaveItButton = false,
  isBlockView,
  onClickWatched = (): void => {},
  onClickRemove = (): void => {},
  onClickSaveIt = (): void => {}
}) => {
  const { t } = useTranslation();
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
          src={process.env.REACT_APP_MEDIA_URL + movie.posterPath}
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
                    isBlockView ? `mb-2` : `mt-2`
                  }`}
                >
                  {genre ? genre.name : "Unknown Genre"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {showWatchedAndRemoveButtons ? (
        <div
          className={`z-20 space-y-4 ${
            !isBlockView ? `my-auto ml-3 grid grid-flow-row` : null
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
      {showSaveItButton ? (
        <button
        onClick={() => onClickSaveIt(movie.id)}
        className={`hover:bg-blue-950 hover:text-white rounded-sm px-5 py-2 ${
          isSaved
            ? "bg-white text-blue-950"
            : "bg-blue-700 text-white"
        }`}>
          {t("saveIt")}
        </button>
      ) : null}
    </div>
  );
};

export default OneMovie;
