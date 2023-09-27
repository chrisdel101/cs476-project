import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import User from '../../models/abstractClasses/User'
import authFunctions from '../../api/authFunctions'
import Donor from '../../models/Donor'

export interface IUserContext {
  currentUser?: User | null
  isLoggedIn?: boolean | null
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setCurrentUser: (user: User | null) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IUserContext>(null!)

interface UserProviderProps {
  children: ReactNode
}

function useProviderAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  useEffect(() => { 

    try {
      (async () => {
        const signedInUser = await authFunctions.getSignInState()
        // TODO: build the user object from incoming data here
        // console.log(signedInUser, "signedInUser");
        if (signedInUser) {
          console.log(signedInUser, "signedInUser");
          setIsLoggedIn(true)
          // this wrong - only for testing
          setCurrentUser(new Donor({ name: 'joes', email: signedInUser.email }))
        } else {
          
          console.log('isSignedIn hook: USER IS NOT SIGNED IN')
          setIsLoggedIn(false)
          setCurrentUser(null)
        }
      })()
    } catch (error) {
      console.error('Error:', error)
    }
  }, [])
  // call firebase to check if user is signed in
  return { isLoggedIn, currentUser, setCurrentUser, setIsLoggedIn }
}

export function ProvideAuth({ children }: UserProviderProps) {
  const { isLoggedIn, currentUser, setCurrentUser, setIsLoggedIn } = useProviderAuth()

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
