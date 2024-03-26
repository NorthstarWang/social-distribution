import { Author } from '@/types/author';
import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false as boolean,
  setIsAuthenticated: (value: boolean | ((prevVar: boolean) => boolean)) => {},
});

export const AuthorContext = createContext({
  author: null as Author | null,
  setAuthor: (value: any | ((prevVar: any) => any)) => {},
});
