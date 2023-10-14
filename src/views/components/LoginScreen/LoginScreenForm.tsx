import styled from 'styled-components'
import { handleLogin } from '../../../controllers/LoginScreen/loginScreenController.ts'
import { UserTypes } from '../../../../constants.ts'
import { useHistory, useParams } from 'react-router-dom'
import useUserContext from '../../../controllers/context/useUserContext.ts'
import {Form, Button} from 'react-bootstrap'
import { useState } from 'react'

interface IForm {
    setSuccessMsg: (str: string|undefined) => void;
  }

const LoginScreenForm = ({setSuccessMsg}: IForm) => { 
  const { userType } = useParams<{ userType: UserTypes }>()
  const {setIsLoggedIn, setCurrentUser} = useUserContext();
  const history = useHistory()
  const [validated, setValidated] = useState(false)
  
  return (
    <FormContainer> {/* Container for the form with a border */}
      <Form
        noValidate
        validated={validated}
        onSubmit={(e) => 
          handleLogin(
            e, 
            history, 
            setIsLoggedIn, 
            setCurrentUser, 
            userType,
            setValidated
        )}
      >

        <Form.Label className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Login to Your Account</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            required
            type="text" 
            name="email"
            placeholder="Enter Email"/>
          <Form.Control.Feedback type="invalid">Cannot be blank</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required 
            type="password" 
            name="password"
            placeholder="Enter Password"/>
          <Form.Control.Feedback type="invalid">Cannot be blank</Form.Control.Feedback>
        </Form.Group>
      
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" style={{ width: '150px' }} >
            Login
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default LoginScreenForm

const FormContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  background-color: #ececec;
`;
