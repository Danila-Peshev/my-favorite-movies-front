import { ReactNode, useState, useContext } from "react";
import { createContext } from "react";

type ViewContextType = {
  isBlockView: boolean;
  setIsBlockView: (isBlockView: boolean) => void;
};

export const ViewContext = createContext<ViewContextType>({
  isBlockView: false,
  setIsBlockView: () => {},
});

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [isBlockView, setIsBlockView] = useState<boolean>(false);

  return (
    <ViewContext.Provider value={{ isBlockView, setIsBlockView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => useContext(ViewContext);
