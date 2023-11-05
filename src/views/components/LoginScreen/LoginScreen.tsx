import styled from 'styled-components'
import { UserTypes } from '../../../../constants.ts'
import { useParams } from 'react-router-dom'
// import LoginScreenModal from './LoginScreenModal'
import LoginScreenForm from './LoginScreenForm'
import { useState } from 'react'
import { AppAlert as Alert }  from '../Alert'
import { AlertTypes } from '../../../../constants'
import { capitalizeFirstLetter } from '../../../utilities/utils.ts'

const LoginScreen = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState<string | undefined>("")

  return (
    
    <PageContainer>

      <Alert variant={AlertTypes.DANGER} message={errorMsg} show={errorMsg} setShow={setErrorMsg} duration={6000} />

      <h5 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {capitalizeFirstLetter(userType)} Login
      </h5>

      <LoginScreenForm setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg}/>

    </PageContainer>
  )
}
  
export default LoginScreen

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: LightGray;
  width: 100%;
`
