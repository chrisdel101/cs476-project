import styled from 'styled-components'
import { handleLogin } from '../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../constants.ts'
import { useHistory, useParams } from 'react-router-dom'
import useUserContext from '../../../controllers/context/useUserContext.ts'
import {Form, Button} from 'react-bootstrap'

interface IForm {
    handleCloseLoginScreenModal: () => void;
    setSuccessMsg: (str: string|undefined) => void;
  }

const LoginScreenForm = ({handleCloseLoginScreenModal, setSuccessMsg}: IForm) => { 
  const { userType } = useParams<{ userType: UserTypes }>()
  const {setIsLoggedIn, setCurrentUser} = useUserContext();
  const history = useHistory()
  
  return (

      <Form
        noValidate
        onSubmit={(e) => 
          handleLogin(
            e, 
            history, 
            setIsLoggedIn, 
            setCurrentUser, 
            userType
        )}
      >

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          required
          type="text" 
          name="email"
          placeholder="Enter Email"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required 
          type="password" 
          name="password"
          placeholder="Enter Password"/>
      </Form.Group>
      
      <Button variant="primary" type="submit"> Submit </Button>
    </Form>
  
  )
  }
export default LoginScreenForm

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: red;
  width: 100%;
`