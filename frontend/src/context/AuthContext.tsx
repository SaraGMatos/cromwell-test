import { createContext, useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthState {
  isAuthenticated: () => boolean;
  userId: string | null;
}

interface CromwellJwtPayload extends JwtPayload {
  user_id: string;
}

type Props = { children: React.ReactNode };

export const AuthContext = createContext<AuthState>({
  isAuthenticated: () => false,
  userId: null,
});

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const isAuthenticated = (): boolean => {
    //TODO Check if it's expired

    return token ? true : false;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("CROMWELL_AUTH_TOKEN");
    setToken(storedToken);

    if (storedToken) {
      const payload = jwtDecode<CromwellJwtPayload>(storedToken);

      setUserId(payload.user_id);
    }

    //! isReady is used to prevent children being rendered before useEffect is called.
    setIsReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
