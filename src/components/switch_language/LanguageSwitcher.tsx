import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SwitchLanguageButton from "./SwitchLanguageButton";

const LanguageSwitcher = () => {
    const [activeLanguage, setActiveLanguage] = useState('ru');
    const { i18n } = useTranslation();
  
    const changeLanguage = useCallback((lng: string) => {
      i18n.changeLanguage(lng);
      setActiveLanguage(lng);
    }, [i18n]);
  
    useEffect(() => {
      changeLanguage(activeLanguage);
    }, [activeLanguage, changeLanguage]);
  
    return (

      <div className="flex space-x-2">
        <SwitchLanguageButton
          language="EN"
          active={activeLanguage === 'en'}
          onClick={() => setActiveLanguage('en')}
        />
        <SwitchLanguageButton
          language="RU"
          active={activeLanguage === 'ru'}
          onClick={() => setActiveLanguage('ru')}
        />
      </div>
    );
  };
  
  export default LanguageSwitcher;