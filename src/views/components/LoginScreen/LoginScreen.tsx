import styled from 'styled-components'
import { UserTypes } from '../../../../constants.ts'
import { useParams } from 'react-router-dom'
import LoginScreenModal from './LoginScreenModal'
import LoginScreenForm from './LoginScreenForm'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const LoginScreen = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState<string | undefined>("")

  const [showLoginScreenModal, setShowLoginScreenModal] = useState<boolean>(false)
  const handleCloseLoginScreenModal = () => setShowLoginScreenModal(false)
  const handleShowLoginScreenModal = ()  => setShowLoginScreenModal(true)

  return (
   
    <PageContainer>

      <h5>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h5>

      <LoginScreenForm setSuccessMsg={setSuccessMsg}/>

    </PageContainer>
  )
}
  
export default LoginScreen

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: light-gray;
  width: 100%;
`

const StyledButton = styled(Button)<any>`
  width: 200px;
  align-self: center;
`