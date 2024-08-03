import ReactDOM from "react-dom/client";
import "./index.css";
import { fillLocalStorage } from "./fillLocalStorage";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./global-components/AuthContext";
import { LanguageProvider } from "./global-components/switch-language/LanguageContext";
import i18n from "./i18n";
import router from "./routes";
import NavBar from "./global-components/NavBar";

fillLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <LanguageProvider>
        <NavBar />
        <RouterProvider router={router} />
      </LanguageProvider>
    </AuthProvider>
  </I18nextProvider>
);
