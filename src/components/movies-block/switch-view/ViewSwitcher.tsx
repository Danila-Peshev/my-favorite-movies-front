import SwitchViewButton from "./SwitchViewButton";
import row_view from "../../../assets/views-images/row_view.png";
import block_view from "../../../assets/views-images/block_view.png";
import { useView } from "./ViewContext";

const ViewSwitcher = () => {
  const { isBlockView, setIsBlockView } = useView();

  return (
    <div className="flex space-x-2">
      <SwitchViewButton
        active={!isBlockView}
        imagePath={row_view}
        onClick={() => setIsBlockView(false)}
      />
      <SwitchViewButton
        active={isBlockView}
        imagePath={block_view}
        onClick={() => setIsBlockView(true)}
      />
    </div>
  );
};

export default ViewSwitcher;
