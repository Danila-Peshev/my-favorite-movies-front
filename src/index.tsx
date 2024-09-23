import ReactDOM from "react-dom/client";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { LanguageProvider } from "./components/switch-language/LanguageContext";
import i18n from "./i18n";
import router from "./routes";
import NavBar from "./components/NavBar";
import {
  ApolloProvider,
} from "@apollo/client";
import client from "./apollo";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <LanguageProvider>
          <NavBar />
          <RouterProvider router={router} />
        </LanguageProvider>
      </AuthProvider>
    </I18nextProvider>
  </ApolloProvider>
);
