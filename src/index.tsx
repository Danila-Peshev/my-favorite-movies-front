import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { fillLocalStorage } from './fillLocalStorage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


fillLocalStorage();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Home />
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
    <RouterProvider router={router} />
);
