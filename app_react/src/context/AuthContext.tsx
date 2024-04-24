import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utilisez React.PropsWithChildren pour ajouter automatiquement la définition de `children`
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Sauvegarde du token dans le localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Suppression du token du localStorage lors de la déconnexion
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
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
