import { createContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { User } from '@/types';

interface AuthContextProps {
  user?: User | null;
  token?: string | null;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: JSX.Element;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('AUTH_TOKEN')
  );
  const { data: authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
