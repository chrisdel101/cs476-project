import styled from 'styled-components'
import { handleLogin } from '../../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../../constants'
import useUserSessions from '../../../../controllers/hooks/sessions/useUserSessions.ts'
import {handleLogout} from '../../../../controllers/LoginScreen/loginScreenController.ts'
import { useParams } from 'react-router-dom'

interface Iprops {
    userType: UserTypes
}

const Login = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  const {isLoggedIn, currentUser} = useUserSessions()

  if (isLoggedIn) {
    console.log(currentUser)
    return (
      <>
      
      <h1>you are logged in</h1>
      <button onClick={() => handleLogout(isLoggedIn)}>Logout</button>
      </>
    )
  } else {
  return (
    <PageContainer>
      <h5>{userType}</h5>
      <form onSubmit={handleLogin}>
        <input type="text" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit" value="Login" />
      </form>
    </PageContainer>
  )
  }
}
export default Login

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: red;
  height: 100%;
  width: 100%;
`
