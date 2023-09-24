// import { getFirestore } from 'firebase-admin/firestore'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase.config'

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
        user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      }),
    logoutUser: () => {}
}
export default authFunctions
