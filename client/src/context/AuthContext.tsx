import { useAuth } from '@/hooks/auth/useAuth';
import { User } from '@/types';
import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  user?: User | null;
  token?: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: JSX.Element;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();
  const { data: authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
