import SwitchLanguageButton from "./SwitchLanguageButton";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <SwitchLanguageButton
        language="EN"
        active={language === "en"}
        onClick={() => changeLanguage("en")}
      />
      <SwitchLanguageButton
        language="RU"
        active={language === "ru"}
        onClick={() => changeLanguage("ru")}
      />
    </div>
  );
};

export default LanguageSwitcher;
