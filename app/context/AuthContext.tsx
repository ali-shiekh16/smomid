'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: true,
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // In a real app, you would validate against a backend
  // This is a simplified example for demonstration
  const login = async (username: string, password: string) => {
    // For demo purposes, hardcoded credentials
    // In a real app, this would be an API call
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('auth_token', 'demo_token');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
