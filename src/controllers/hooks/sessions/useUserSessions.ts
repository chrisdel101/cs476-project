import { useEffect, useState } from 'react'
import User from '../../../models/abstractClasses/User';
import authFunctions from '../../../api/authFunctions';


// authFunctions
// - can be used inside components see index screen exmaple
const useUserSessions = () => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  
  useEffect(() => {
      (async () => {
        try {
          // call firebase to check if user is signed in
          const signedInUser = await authFunctions.getSignInState();
          // TODO: build the user object from incoming data here
          console.log(signedInUser, "signedInUser");
          if (signedInUser) { 
            setisLoggedIn(true)
            setCurrentUser(signedInUser)
          } else {
            console.log('isSignedIn hook: USER IS NOT SIGNED IN')
            setisLoggedIn(false)
            setCurrentUser(null)
          }
          
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    
  }, [isLoggedIn, currentUser])

  return { isLoggedIn, currentUser } 
}

export default useUserSessions

