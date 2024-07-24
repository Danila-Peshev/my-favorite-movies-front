import { FC } from "react";

interface SwitchLanguageButtonProps {
    language: string;
    active: boolean;
    onClick: () => void;
  }
  
  const SwitchLanguageButton: FC<SwitchLanguageButtonProps> = ({ language, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`w-12 border border-solid border-black rounded ${active ? 'bg-blue-800 text-white' : 'bg-gray-200 text-blue-950'}`}
      >
        {language}
      </button>
    );
  };
  
  export default SwitchLanguageButton;