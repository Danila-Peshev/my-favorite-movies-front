import { ReactNode, useState, useContext } from "react";
import { createContext } from "react";
import { Language } from "../../types/Language";

type LanguageContextType = {
  activeLanguage: Language;
  changeLanguage: (language: Language) => void;
};

const defaultLanguageContext: LanguageContextType = {
  activeLanguage: 'ru',
  changeLanguage: (language: Language) => {}
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [activeLanguage, setActiveLanguage] = useState<Language>('ru');

  const changeLanguage = (language: Language) => {
    setActiveLanguage(language);
  }

  return (
    <LanguageContext.Provider value={{ activeLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext<LanguageContextType>(LanguageContext);
