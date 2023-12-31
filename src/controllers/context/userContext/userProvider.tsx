import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import User from '../../../models/abstractClasses/User'
import authFunctions from '../../../api/authFunctions'
import Donor from '../../../models/Donor'
import crudFunctions from '../../../api/crudFunctions'
import { UserTypes } from '../../../../constants'
import Receiver from '../../../models/Receiver'
export interface IUserContext {
  currentUser?: User | null
  isLoggedIn?: boolean | null
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setCurrentUser: (user: User | null) => void
  isLoaded?: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IUserContext>(null!)

interface UserProviderProps {
  children: ReactNode
}
function useProviderAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => { 

    try {
      (async () => {
        const signedInAuthUser: any = await authFunctions.getSignInState()
        // TODO: fix  this to be less hacky
        if (signedInAuthUser) {
          // we don't know if it's Donor or Reciever here - need to check both
          // not a great way to do this 
          const userData = await crudFunctions.getUserTypeUnkown(signedInAuthUser.uid)
          if(userData && userData?.userType  === UserTypes.DONOR){
            const getDonor = await crudFunctions.getUserByType({
              userType: UserTypes.DONOR,
              id: signedInAuthUser.uid,
            }) as Donor
            const donor = new Donor(getDonor)
            setIsLoggedIn(true)
            setCurrentUser(donor)
            setIsLoaded(true)
          } else if(userData && userData?.userType  === UserTypes.RECEIVER) {
            const getReceiver = await crudFunctions.getUserByType({
              userType: UserTypes.RECEIVER,
              id: signedInAuthUser.uid,
            }) as Receiver
            const receiver = new Receiver(getReceiver)
            setIsLoggedIn(true)
            setCurrentUser(receiver)
            setIsLoaded(true)
          }
        } else {
          setIsLoggedIn(false)
          setCurrentUser(null)
          setIsLoaded(true)
        }
      })()
    } catch (error) {
      console.error('Error in user Auth:', error)
    }
  }, [isLoggedIn])
  // call firebase to check if user is signed in
  return { isLoggedIn, currentUser, setCurrentUser, setIsLoggedIn, isLoaded }
}

export function ProvideAuth({ children }: UserProviderProps) {
  const { isLoggedIn, currentUser, setCurrentUser, setIsLoggedIn, isLoaded } = useProviderAuth()
  return (
    <AuthContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser, isLoaded }}
    >
      {children}
    </AuthContext.Provider>
  )
}
