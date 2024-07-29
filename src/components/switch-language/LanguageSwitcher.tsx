import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SwitchLanguageButton from "./SwitchLanguageButton";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
  const { activeLanguage, changeLanguage } = useLanguage();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(activeLanguage);
  }, [activeLanguage, i18n]);

  return (
    <div className="flex space-x-2">
      <SwitchLanguageButton
        language="EN"
        active={activeLanguage === "en"}
        onClick={() => changeLanguage("en")}
      />
      <SwitchLanguageButton
        language="RU"
        active={activeLanguage === "ru"}
        onClick={() => changeLanguage("ru")}
      />
    </div>
  );
};

export default LanguageSwitcher;
