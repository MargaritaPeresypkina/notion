import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  let { user, loading } = useContext(UserContext);
  let location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.id && location.pathname !== "/signup") {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
