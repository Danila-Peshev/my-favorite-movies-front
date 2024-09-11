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
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

fillLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_SERVER_URI,
  cache: new InMemoryCache(),
});

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
