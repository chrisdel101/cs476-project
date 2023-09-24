import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase.config'
import useUserSessions from '../hooks/authenitication/useUserSessions'
import authFunctions from '../../api/authFunctions'

export const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
    // weird syntax only for typescript https://stackoverflow.com/a/44321394/5972531
    const target = e.currentTarget
    console.log(target.email.value)
    const email = target.email.value 
    const password = target.password.value
    authFunctions.loginUser(email, password)

 
}
