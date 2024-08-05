import { FC } from "react";

interface SwitchViewButtonProps {
  imagePath: string;
  active: boolean;
  onClick: () => void;
}

const SwitchViewButton: FC<SwitchViewButtonProps> = ({
  imagePath,
  active,
  onClick,
}) => {
  return (
    <button
      className={`bg-blue-800 rounded-sm px-2 py-1.5 ${
        active ? "bg-gray-500 text-blue-950" : "bg-blue-700 text-white"
      } hover:bg-blue-950 font-medium rounded-sm`}
      onClick={onClick}
    >
      <img className="h-5 w-6" alt="row" src={imagePath} />
    </button>
  );
};

export default SwitchViewButton;
