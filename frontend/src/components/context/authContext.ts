import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean | ((prevVar: boolean) => boolean)) => {},
});
