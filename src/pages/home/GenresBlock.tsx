import { FC, useState, useEffect } from "react";
import { Genre } from "../../types/movie-api-types/Genre";
import { useTranslation } from "react-i18next";

interface GenresBlockProps {
  genres: Genre[];
  selectedGenres: number[];
  clickOnGenre: (genreId: number) => void;
}

const GenresBlock: FC<GenresBlockProps> = ({ genres, selectedGenres=[], clickOnGenre }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <span>{t("selectYouFavoriteGenres")}</span>
      <div className="mt-5 grid grid-cols-10 grid-rows-2 gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`hover:bg-blue-950 hover:text-white rounded-full px-5 py-2 overflow-hidden truncate ${
              selectedGenres.includes(genre.id)
                ? "bg-white text-blue-950"
                : "bg-blue-700 text-white"
            }`}
            onClick={() => clickOnGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenresBlock;
