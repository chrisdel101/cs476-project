import styled from 'styled-components'
import { signIn, handleSubmit } from '../../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../../constants'

interface Iprops {
    userType: UserTypes
}

const Login = ({userType}: Iprops) => {
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
