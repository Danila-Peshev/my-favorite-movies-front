import { ReactNode, useState, useContext } from "react";
import { createContext } from "react";
import { Language } from "../../types/Language";

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

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext<LanguageContextType>(LanguageContext);
