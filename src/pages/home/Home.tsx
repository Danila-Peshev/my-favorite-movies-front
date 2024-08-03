import { useAuth } from "../../global-components/AuthContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="w-full text-center mt-96">
      <h1 className="text-4xl font-bold">
        {t("welcome", { user: user?.email })}
      </h1>
      <div className="mt-10">
        <button
          onClick={() => logout()}
          className="border-2 border-black rounded w-20 
          hover:bg-black hover:border-gray-300 hover:text-white"
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Home;
