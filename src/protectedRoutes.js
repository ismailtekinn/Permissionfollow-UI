import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function ProtectedRoutes({ component: Component ,newPasswordPage}) {
  const { loggedIn,user } = useAuth();
  if(loggedIn && !newPasswordPage && user && user.isActive === 'false') return <Navigate to = "/new-password"/>
  if (loggedIn) return <Component />;

  return <Navigate to="/signin" />;
}

export default ProtectedRoutes;
