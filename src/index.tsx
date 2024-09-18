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
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"

fillLocalStorage();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GQL_SERVER_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
