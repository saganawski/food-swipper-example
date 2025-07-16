import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  partnerId: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (provider: 'google' | 'facebook' | 'apple') => Promise<void>;
  logout: () => void;
  linkPartner: (partnerId: string) => void;
  unlinkPartner: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage (for demo purposes)
    const storedUser = localStorage.getItem('foodswipe_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any email/password and use first mock user
    const user = mockUsers[0];
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('foodswipe_user', JSON.stringify(user));
  };

  const loginWithSocial = async (provider: 'google' | 'facebook' | 'apple') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, just login with the first mock user
    const user = mockUsers[0];
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('foodswipe_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('foodswipe_user');
  };

  const linkPartner = (partnerId: string) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        partnerId
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('foodswipe_user', JSON.stringify(updatedUser));
    }
  };

  const unlinkPartner = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        partnerId: null
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('foodswipe_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    loginWithSocial,
    logout,
    linkPartner,
    unlinkPartner
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};