import { useEffect, useState } from 'react'
import User from '../../../models/abstractClasses/User';
import authFunctions from '../../../api/authFunctions';



const useUserSessions = () => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  useEffect(() => {
      (async () => {
        try {
          const signedInUser = await authFunctions.getSignInState();
          console.log(signedInUser, "signedInUser");
          if (signedInUser) { 
          setisLoggedIn(true)
          setCurrentUser(signedInUser)
          } else {
            console.log('isSignedIn hook: USER IS NOT SIGNED IN')
            setisLoggedIn(false)
          }
          
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    
  }, [isLoggedIn, currentUser])

  return { isLoggedIn, currentUser } 
}

export default useUserSessions

