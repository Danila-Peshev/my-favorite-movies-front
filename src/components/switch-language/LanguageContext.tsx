import { ReactNode, useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { Language } from "../../types/Language";
import i18n from "../../i18n";

type LanguageContextType = {
  language: Language;
  changeLanguage: (language: Language) => void;
};

const defaultLanguageContext: LanguageContextType = {
  language: 'ru',
  changeLanguage: (language: Language) => {}
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setlanguage] = useState<Language>('ru');

  const changeLanguage = (language: Language) => {
    setlanguage(language);
  }

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext<LanguageContextType>(LanguageContext);
