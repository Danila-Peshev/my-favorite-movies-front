import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SwitchLanguageButton from "./SwitchLanguageButton";

type Language = "ru" | "en";

const LanguageSwitcher = () => {
  const [activeLanguage, setActiveLanguage] = useState<Language>("ru");
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(activeLanguage);
  }, [activeLanguage, i18n]);

  return (
    <div className="flex space-x-2">
      <SwitchLanguageButton
        language="EN"
        active={activeLanguage === "en"}
        onClick={() => setActiveLanguage("en")}
      />
      <SwitchLanguageButton
        language="RU"
        active={activeLanguage === "ru"}
        onClick={() => setActiveLanguage("ru")}
      />
    </div>
  );
};

export default LanguageSwitcher;
