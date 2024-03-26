"use client";
import React, { useState, ReactNode } from 'react';
import { AuthContext, AuthorContext } from '@/components/context/authContext';
import { Author } from '@/types/author';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [author, setAuthor] = useState<Author | null>(null);

  const authValue = { isAuthenticated, setIsAuthenticated };
  const authorValue = { author, setAuthor };

  return (
    <AuthContext.Provider value={authValue}>
      <AuthorContext.Provider value={authorValue}>
        {children}
      </AuthorContext.Provider>
    </AuthContext.Provider>
  );
};
