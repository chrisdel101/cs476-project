import styled from 'styled-components'
import { handleLogin } from '../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../constants.ts'
import { useHistory, useParams } from 'react-router-dom'
import useUserContext from '../../../controllers/context/useUserContext.ts'

const Login = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  const {setIsLoggedIn, setCurrentUser} = useUserContext();
  const history = useHistory()

  return (
    <PageContainer>
      <h5>{userType}</h5>
      <form
        onSubmit={(e) => handleLogin(e, history, setIsLoggedIn, setCurrentUser, userType)}
      >
        <input type="text" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit" value="Login" />
      </form>
    </PageContainer>
  )
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
