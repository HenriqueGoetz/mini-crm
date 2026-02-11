import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../services/tokenService";

interface AuthContextType {
  user: string | null | undefined;
  login: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const token = tokenService.get();
    if (token) {
      const decoded = jwtDecode(token);
      if ("username" in decoded) {
        setUser(decoded["username"] as string);
        return;
      }
    }
    setUser(null);
  }, []);

  function login(token: string, username: string) {
    tokenService.set(token);
    setUser(username);
    navigate("/");
  }

  function logout() {
    tokenService.remove();
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
