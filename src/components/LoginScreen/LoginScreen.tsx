import { auth } from '../../services/firebase.config'
import styled from 'styled-components'
import { Auth, getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const isSignedIn: any = () => {
   return onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log('UID', uid)
          return true
          // ...
        } else {
           return  false
          // User is signed out
          // ...
        }
      });
}

const signIn = (email, password) => {
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
const handleSubmit = (e) => {
  e.preventDefault()
  if (!isSignedIn()) {
      const email = e.target.email.value
      const password = e.target.password.value
      signIn(email, password)
  } else {
    console.log
  }

}
interface Iprops {
    userType: string
}
const Login = ({userType}: Iprops) => {
    console.log(userType)
  return (
    <ContainerWrapper>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit" value="Login" />
      </form>
    </ContainerWrapper>
  )
}
export default Login

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: red;
  height: 500px;
  width: 100%;
`
