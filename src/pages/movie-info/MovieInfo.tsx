import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OnlyMovie } from "../../types/movie-api-types/OnlyMovie";
import { getMovieById } from "../../services/MovieService";
import { useLanguage } from "../../components/switch-language/LanguageContext";
import { SimpleMovie } from "../../types/movie-api-types/SimpleMovie";

const MovieInfo = () => {
  const params = useParams();
  const movieId = Number(params.id);
  const { activeLanguage } = useLanguage();
  const [simpleMovie, setSimpleMovie] = useState<SimpleMovie>();

  async function fetchSimpleMovie() {
    setSimpleMovie(await getMovieById(movieId, activeLanguage));
  }

  useEffect(() => {
    fetchSimpleMovie();
  }, []);

  console.log(simpleMovie);

  if (!simpleMovie) {
    return (
      <div className="w-full text-center mt-96 mx-auto">
        <span className="text-6xl">LOADING...</span>
      </div>
    );
  }

  return (
    <div>
      <img
        className="absolute top-0 left-0 w-full h-full z-0 object-cover"
        alt={simpleMovie.title}
        src={`https://image.tmdb.org/t/p/original${simpleMovie.backdrop_path}`}
      />
      <div className="relative my-64 w-3/6 h-96 mx-auto bg-white rounded shadow-2xl shadow-black drop-shadow-2xl">
        <img
          className="h-full left-0 top-0 rounded"
          alt={simpleMovie.title}
          src={`https://image.tmdb.org/t/p/w300${simpleMovie.poster_path}`}
        />
        <span>{simpleMovie.title}</span>
        <span>
          {simpleMovie.genres.map((genre) => (
            <span>{genre.name}</span>
          ))}
        </span>
        <span>{simpleMovie.overview}</span>
        <span>{simpleMovie.release_date}</span>
        <span>{simpleMovie.popularity}</span>
        <span>{simpleMovie.vote_average}</span>
        <span>{simpleMovie.vote_count}</span>
      </div>
    </div>
  );
};

export default MovieInfo;
