import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../global-components/ProtectedRoute";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

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
]);

export default router;
