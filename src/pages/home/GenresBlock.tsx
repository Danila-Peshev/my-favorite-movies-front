import { FC, useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext";
import { Genre } from "../../types/movie-api-types/Genre";
import { useTranslation } from "react-i18next";
import {
  addFavoriteGenreByUserId,
  getFavoriteGenresByUserId,
  removeFavoriteGenreByUserId,
} from "../../services/UserDataService";

interface GenresBlockProps {
  genres: Genre[];
}

const GenresBlock: FC<GenresBlockProps> = ({ genres }) => {
  const { user } = useAuth();
  const [favoriteGenresId, setFavoriteGenresId] = useState<number[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setFavoriteGenresId(getFavoriteGenresByUserId(user.id));
  }, []);

  const handleClickOnGenre = (genreId: number) => {
    if (favoriteGenresId.includes(genreId)) {
      removeFavoriteGenreByUserId(user.id, genreId);
    } else {
      addFavoriteGenreByUserId(user.id, genreId);
    }

    const updatedFavoriteGenres = getFavoriteGenresByUserId(user.id);
    setFavoriteGenresId(updatedFavoriteGenres);
  };

  return (
    <div className="w-full">
      <span>{t("selectYouFavoriteGenres")}</span>
      <div className="mt-5 grid grid-cols-10 grid-rows-2 gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`hover:bg-blue-950 hover:text-white rounded-full px-5 py-2 overflow-hidden truncate ${
              favoriteGenresId.includes(genre.id)
                ? "bg-white text-blue-950"
                : "bg-blue-700 text-white"
            }`}
            onClick={() => handleClickOnGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenresBlock;
