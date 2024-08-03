import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthContext";
import LanguageSwitcher from "./switch-language/LanguageSwitcher";

const NavBar = () => {
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  if (user) {
    return (
      <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0">
        <div className="relative flex items-center justify-between p-4">
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-white text-2xl">{t("title")}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-white font-medium text-sm">{t("welcome", {user: user?.email})}</span>
            <span className="text-white font-medium text-sm">|</span>
            <button
              type="button"
              onClick={logout}
              className="text-white font-medium rounded-lg text-sm py-2 text-center"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600">
        <div className="relative flex items-center justify-between p-4">
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-white text-2xl">{t("title")}</span>
          </div>
        </div>
      </nav>
    );
  }

  
}

export default NavBar;