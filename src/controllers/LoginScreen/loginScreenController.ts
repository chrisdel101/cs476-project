import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import isUserAuthenicated from "../hooks/authenitication/useIsUserAuthenicated"
import { auth } from '../../services/firebase.config'


interface SignInProps {  
    email: string
    password: string
}
export const signIn = ({email, password}: SignInProps) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log('OKAY', user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  export const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault()
    if (!isUserAuthenicated()) {
        // weird syntax only for typescript https://stackoverflow.com/a/44321394/5972531
        const email = (e.target as HTMLInputElement).value 
        const password = (e.target as HTMLInputElement).value
    } else {
      console.log
    }
  }