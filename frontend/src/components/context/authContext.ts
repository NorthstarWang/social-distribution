import { Author } from '@/types/author';
import { createContext } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: (value: any | ((prevVar: any) => any)) => {},
});

export const AuthorContext = createContext({
  author: null as Author | null,
  setAuthor: (value: any | ((prevVar: any) => any)) => {},
});
