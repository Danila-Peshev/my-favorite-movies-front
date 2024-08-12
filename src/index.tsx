import ReactDOM from "react-dom/client";
import "./index.css";
import { fillLocalStorage } from "./fillLocalStorage";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { LanguageProvider } from "./components/switch-language/LanguageContext";
import i18n from "./i18n";
import router from "./routes";
import NavBar from "./components/NavBar";
import { ViewProvider } from "./pages/home/movies-block/switch-view/ViewContext";
import { UserProvider } from "./components/UserContext";

fillLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <LanguageProvider>
        <UserProvider>
          <NavBar />
          <RouterProvider router={router} />
        </UserProvider>
      </LanguageProvider>
    </AuthProvider>
  </I18nextProvider>
);
