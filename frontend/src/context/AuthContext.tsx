import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/api';

interface User {
  id: number;
  osebna_stevilka: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (osebna_stevilka: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: {
    osebna_stevilka: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
  }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await api.getUser();
        setIsAuthenticated(true);
        setUser(userData);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (osebna_stevilka: string, password: string) => {
    try {
      const response = await api.login({ osebna_stevilka, password });
      if (response) {
        const userData = await api.getUser();
        setIsAuthenticated(true);
        setUser(userData);
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (userData: {
    osebna_stevilka: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
  }) => {
    try {
      const response = await api.register(userData);
      if (response) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
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