import { FC, useState, useEffect } from "react";
import { useAuth } from "../../global-components/AuthContext";
import { Genre } from "../../types/movie-api-types/Genre";
import { useTranslation } from "react-i18next";

interface GenresBlockProps {
  genres: Genre[];
}

const GenresBlock: FC<GenresBlockProps> = ({ genres }) => {
  const { user, addFavoriteGenre, removeFavoriteGenre, getFavoriteGenresId } =
    useAuth();
  const [favoriteGenresId, setFavoriteGenresId] = useState<number[]>(
    getFavoriteGenresId()
  );
  const { t } = useTranslation();

  const handleClickOnGenre = (genreId: number) => {
    if (favoriteGenresId.includes(genreId)) {
      removeFavoriteGenre(genreId);
    } else {
      addFavoriteGenre(genreId);
    }
  };

  useEffect(() => {
    setFavoriteGenresId(getFavoriteGenresId());
  }, [user]);

  return (
    <div className="w-full">
      <span>{t("selectYouFavoriteGenres")}</span>
      <div className="mt-5 grid grid-cols-10 grid-rows-2 gap-2">
        {genres.map((genre) => (
          <button
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
