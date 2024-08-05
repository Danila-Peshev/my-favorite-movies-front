import GenresBlock from "./GenresBlock";
import { useEffect, useState } from "react";
import { Genre } from "../../types/movie-api-types/Genre";
import { getAllGenres } from "../../services/MovieService";
import { useLanguage } from "../../global-components/switch-language/LanguageContext";
import MoviesBlock from "../../components/movies-block/MoviesBlock";
import { ViewProvider } from "../../components/movies-block/switch-view/ViewContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { language } = useLanguage();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  async function fetchGenres() {
    setLoading(true);
    setError(false);
    try {
      const fetchedGenres = await getAllGenres(language);
      setGenres(fetchedGenres);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, [language]);

  return (
    <ViewProvider>
      <div className="w-11/12 flex flex-col gap-y-5 p-5 mx-auto mt-24 mb-12 text-white text-base font-medium bg-gray-900 rounded">
        {loading ? (
          t("loading")
        ) : error ? (
          t("requestError")
        ) : (
          <>
            <GenresBlock genres={genres} />
            <MoviesBlock genres={genres} isOnAddedPage={false} />
          </>
        )}
      </div>
    </ViewProvider>
  );
};

export default Home;
