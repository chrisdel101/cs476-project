import styled from 'styled-components'
import { UserTypes } from '../../../../constants.ts'
import { useParams } from 'react-router-dom'
// import LoginScreenModal from './LoginScreenModal'
import LoginScreenForm from './LoginScreenForm'
import { useState } from 'react'
import { AppAlert as Alert }  from '../Alert'
import { AlertTypes } from '../../../../constants'
import { capitalizeFirstLetter } from '../../../utilities/utils.ts'
import BeeLogo from '../../../assets/receiverlogoresize.png'
import FlowerLogo from '../../../assets/donorlogoresize.png'
const LoginScreen = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState<string | undefined>("")

  return (
    
    <PageContainer>

      <Alert variant={AlertTypes.DANGER} message={errorMsg} show={errorMsg} setShow={setErrorMsg} duration={6000} />
      
      <Styledh5>
        <ImgHolder>
          {userType === UserTypes.RECEIVER ?
            <img src={BeeLogo} height="45px" width="45px" alt="" /> : null
          }
          {userType === UserTypes.DONOR ?
            <img src={FlowerLogo} height="45px" width="45px"  alt="" /> : null
          }
        </ImgHolder>
        {capitalizeFirstLetter(userType)} Login
      </Styledh5>

      <LoginScreenForm setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg}/>

    </PageContainer>
  )
}
  
export default LoginScreen

const ImgHolder = styled.div`
  display: inline-block;
  margin-right: 10px;
`

const Styledh5 = styled.h5`
  margin-bottom: 25px;
  text-align: center;
  display: inline-block;
  fontSize: '1.5rem'; 
  fontWeight: 'bold'
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: LightGray;
  width: 100%;
`
