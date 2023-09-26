import styled from 'styled-components'
import { handleSubmit } from '../../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../../constants'
import useUserSessions from '../../../../controllers/hooks/sessions/useUserSessions.ts'
import {handleLogout} from '../../../../controllers/LoginScreen/loginScreenController.ts'

interface Iprops {
    userType: UserTypes
}

const Login = ({userType}: Iprops) => {
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
      <form onSubmit={handleSubmit}>
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
