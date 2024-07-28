import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export const ProtectedRoutes = ({ children }: Props) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated());

  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};
