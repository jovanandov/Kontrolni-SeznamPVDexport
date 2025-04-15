import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout } from '../api/api';

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isModerator: () => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Tukaj bi lahko dodali API klic za preverjanje veljavnosti seje
        // in pridobivanje podatkov o uporabniku
        const response = await fetch('/api/auth/user/');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      await login({ username, password });
      const response = await fetch('/api/auth/user/');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Napaka pri odjavi:', error);
    }
  };

  const isAdmin = () => {
    return user?.is_superuser || false;
  };

  const isModerator = () => {
    return user?.is_staff || false;
  };

  const hasPermission = (permission: string) => {
    if (isAdmin()) return true;
    if (isModerator()) {
      // Tukaj lahko dodamo specifične pravice za moderatorje
      return ['settings', 'types', 'exports', 'system', 'profiles'].includes(permission);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout,
        isAdmin,
        isModerator,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 