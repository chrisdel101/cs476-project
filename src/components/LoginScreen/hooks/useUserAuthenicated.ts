import { useEffect, useState } from 'react'
import { auth } from '../../../services/firebase.config'
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'

const useUserAutentication = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log('isSignedIn hook: USER IS SIGNED IN')
        setLoggedIn(true)
        // ...
      } else {
        console.log('isSignedIn hook: USER IS NOT SIGNED IN')
        setLoggedIn(false)
      }
    })
  });

  return loggedIn
}

export default useUserAutentication
