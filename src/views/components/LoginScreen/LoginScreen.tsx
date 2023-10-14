import styled from 'styled-components'
import { handleLogin } from '../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../constants.ts'
import { useHistory, useParams } from 'react-router-dom'
import useUserContext from '../../../controllers/context/useUserContext.ts'
import {Form, Button} from 'react-bootstrap'

const Login = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  const {setIsLoggedIn, setCurrentUser} = useUserContext();
  const history = useHistory()

  return (
    <PageContainer>
      
      <h5>{userType}</h5>

      <Form
        onSubmit={(e) => 
          handleLogin(
            e, 
            history, 
            setIsLoggedIn, 
            setCurrentUser, 
            userType
        )}
      >

      <Form.Group controlId="formBasicEmail">
        {/*<Form.Label>Email</Form.Label>*/}
        <Form.Control 
          required
          type="text" 
          name="email"
          placeholder = "email" />
      </Form.Group>

      <Form.Group  controlId="formBasicPassword">
        {/*<Form.Label>Password</Form.Label>*/}
        <Form.Control
          required 
          type="password" 
          name="password"
          placeholder = "password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
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
  width: 100%;
`
