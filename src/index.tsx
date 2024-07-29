import ReactDOM from "react-dom/client";
import "./index.css";
import { fillLocalStorage } from "./fillLocalStorage";
import { AuthProvider } from "./components/AuthContext";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LanguageSwitcher from "./components/switch-language/LanguageSwitcher";
import { LanguageProvider } from "./components/switch-language/LanguageContext";

fillLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <LanguageProvider>
        <LanguageSwitcher />
        <RouterProvider router={router} />
      </LanguageProvider>
    </AuthProvider>
  </I18nextProvider>
);
