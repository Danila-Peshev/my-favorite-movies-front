import { FC } from "react";

interface SwitchLanguageButtonProps {
  language: string;
  active: boolean;
  onClick: () => void;
}

const SwitchLanguageButton: FC<SwitchLanguageButtonProps> = ({
  language,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-blue-950 hover:text-white font-medium rounded-lg text-xs px-4 py-2 text-center ${
        active ? "bg-white text-blue-700" : "bg-blue-700 text-white"
      }`}
    >
      {language}
    </button>
  );
};

export default SwitchLanguageButton;

