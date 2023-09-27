import { ReactNode, useState } from 'react';
import { createContext } from 'react';
import User from '../../models/abstractClasses/User';
import useUserSessions from '../hooks/sessions/useUserSessions';

export interface IUserContext {
currentUser?: User | null;
  isLoggedIn?: boolean;
}

export const UserContext = createContext<IUserContext>({
    currentUser: undefined,
    isLoggedIn: false
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const {isLoggedIn, currentUser} = useUserSessions()


  return <UserContext.Provider value={{ currentUser, isLoggedIn}}>{children}</UserContext.Provider>;
}
