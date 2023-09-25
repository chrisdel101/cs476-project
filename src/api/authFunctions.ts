// import { getFirestore } from 'firebase-admin/firestore'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../services/firebase.config'
import firebase from 'firebase/compat/app';

const authFunctions = {
  getSignInState: async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        resolve(user);
      });
    });
  },
  loginUser: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        return user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      }),
    // logs out user in firebase
    logoutUser: async (): Promise<boolean> => {
      return signOut(auth).then(() => {
        return true
      }).catch((error) => {
        console.error(error, 'logoutUser')
        return false
        // An error happened.
      });
    }

}
export default authFunctions
