import { ReactNode, useState } from 'react';
import { createContext } from 'react';
import User from '../../models/abstractClasses/User';

export interface IUserContext {
  user?: User;
  isLoggedIn?: boolean;
  setUser: any;
  setisLoggedIn: any;
}

export const UserContext = createContext<IUserContext>(null!);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>();
  const [isLoggedIn, setisLoggedIn] = useState<boolean>();

  return <UserContext.Provider value={{ user, isLoggedIn, setUser, setisLoggedIn }}>{children}</UserContext.Provider>;
}
