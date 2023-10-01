import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function ProtectedRoutes({ component: Component }) {
  const { loggedIn } = useAuth();
  if (loggedIn) return <Component />;

  return <Navigate to="signin" />;
}

export default ProtectedRoutes;
