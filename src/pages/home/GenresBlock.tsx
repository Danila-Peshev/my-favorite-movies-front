import { FC, useState, useEffect } from "react";
import { useAuth } from "../../global-components/AuthContext";
import { Genre } from "../../types/movie-api-types/Genre";

interface GenresBlockProps {
  genres: Genre[];
}

const GenresBlock: FC<GenresBlockProps> = ({genres}) => {
  const { user, addFavoriteGenre, removeFavoriteGenre, getFavoriteGenresId } = useAuth();
  const [favoriteGenresId, setFavoriteGenresId] = useState<number[]>(getFavoriteGenresId());

  const handleClickOnGenre = (genreId: number) => {
    if (favoriteGenresId.includes(genreId)) {
      removeFavoriteGenre(genreId)
    } else {
      addFavoriteGenre(genreId);
    }
  };

  useEffect(() => {
    setFavoriteGenresId(getFavoriteGenresId());
  }, [user])

  return(
    <div className="w-full ">
      <span>Select your favorites genres:</span>
      <div className="mt-2">
        {genres.map(genre => (
          <button
          className={`w-auto px-4 py-1 my-1 mx-1 ${
            favoriteGenresId.includes(genre.id)
              ? "bg-white text-blue-950"
              : "bg-blue-700 text-white"
          } hover:bg-blue-950 hover:text-white font-medium rounded-sm text-base px-4 py-2 text-center`}
          onClick={() => handleClickOnGenre(genre.id)}
        >
          {genre.name}
        </button>
        ))}
        
      </div>
    </div>
  )

}

export default GenresBlock;