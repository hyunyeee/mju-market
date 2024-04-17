import { createContext } from 'react';

interface AuthContext {
  token: string | null;
  setToken: (getToken: string | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  token: null,
  setToken: () => {},
});
