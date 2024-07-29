import { createContext, useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

interface CromwellJwtPayload extends JwtPayload {
  user_id: string;
}

type Props = { children: React.ReactNode };

export const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  //! This is fired by the LoginPage
  //! ---> Setting authenticated to true invalidates the state, calling useEffect again
  //! ---> This then triggers the navigation
  const logIn = async (email: string, password: string): Promise<void> => {
    const result = await loginUser(email, password);
    const token = result.data.token;

    localStorage.setItem("CROMWELL_AUTH_TOKEN", token);

    setIsAuthenticated(true);
  };

  const logOut = () => {
    localStorage.removeItem("CROMWELL_AUTH_TOKEN");
    setIsAuthenticated(false);
    setUserId(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("CROMWELL_AUTH_TOKEN");

    if (storedToken) {
      const payload = jwtDecode<CromwellJwtPayload>(storedToken);

      setUserId(payload.user_id);

      setIsAuthenticated(true);

      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
