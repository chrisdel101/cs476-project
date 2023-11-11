import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../services/firebase.config'
import { FunctionStatus } from '../../constants'

// wrapper return details on add funcs
// lets us know if ok or error
export type FuncStatusReturn = {
  status: FunctionStatus
  data: any
  errorCode?: string
  errorMessage?: string
}
// types for each funciont in crudFunctions
type T = {
  getSignInState: () => Promise<any>
  loginUser: (email: string, password: string) => Promise<FuncStatusReturn>
  logoutUser: () => Promise<boolean>
}
const authFunctions: T = {
  getSignInState: async () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        resolve(user)
      })
    })
  },
  loginUser: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        return {
          status: FunctionStatus.OK,
          data: user,
          errorCode: undefined,
          errorMsg: undefined,
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
        return {
          status: FunctionStatus.ERROR,
          errorCode,
          errorMessage,
          data: undefined,
        }
      }),
  // logs out user in firebase
  logoutUser: async (): Promise<boolean> => {
    return signOut(auth)
      .then(() => {
        return true
      })
      .catch((error) => {
        console.error(error, 'logoutUser')
        return false
      })
  },
}
export default authFunctions
