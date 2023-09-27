import { ReactNode } from 'react';
import { createContext } from 'react';
import User from '../../models/abstractClasses/User';
import useUserSessions from '../hooks/sessions/useUserSessions';

export interface IUserContext {
currentUser?: User | null;
  isLoggedIn?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IUserContext>({
  currentUser: undefined,
  isLoggedIn: false,
})

interface UserProviderProps {
  children: ReactNode;
}

export function ProvideAuth({ children }: UserProviderProps) {
  const { currentUser, isLoggedIn } = useUserSessions()
  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}