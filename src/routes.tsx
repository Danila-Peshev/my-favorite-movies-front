import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MovieInfo from "./pages/movie-info/MovieInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/movie/:id",
    element: (
      <ProtectedRoute>
        <MovieInfo />
      </ProtectedRoute>
    ),
  },
]);

export default router;
