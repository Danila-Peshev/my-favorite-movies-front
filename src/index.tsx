import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { fillLocalStorage } from './fillLocalStorage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './store/store';
import { createContext } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

fillLocalStorage();

interface State {
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store,
})


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{
      store,
    }}>
      <RouterProvider router={router} />
    </Context.Provider>
);
