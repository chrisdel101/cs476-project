import { FunctionStatus, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import Donor from '../../models/Donor'
import Receiver from '../../models/Receiver'

interface IForm {
  e: React.FormEvent<HTMLFormElement>
  currentRadio: UserTypes
  setValidated: (bool: boolean) => void
  setPasswordMatchingError: (bool: boolean|undefined) => void,
  setFireBaseEmailErrorMsg: (str: string|undefined) => void,
  setFireBasePasswordErrorMsg: (str: string|undefined) => void,
  setErrorMsg: (str: string|undefined) => void,
}

export const handleSubmit = async ({
  e,
  currentRadio,
  setValidated,
  setPasswordMatchingError,
  setFireBaseEmailErrorMsg,
  setFireBasePasswordErrorMsg,
  setErrorMsg
}: IForm) => {
  e.preventDefault()
  e.stopPropagation()
  // get user data from form
  const form = e?.currentTarget
  
  // get user data from form
  const name = form['user-name']?.value
  const emailElem = form?.email
  const email = emailElem?.value
  const phone = form?.phone?.value
  const location = form?.location?.value
  const userType = currentRadio
  const passwordElem = form?.password
  const password = passwordElem?.value
  const confirmPasswordElem = form['confirm-password']
  const confirmPassword = confirmPasswordElem?.value

  // reset to defualt state of any prev errors
  setPasswordMatchingError(false)
  setFireBaseEmailErrorMsg(undefined)
  setFireBasePasswordErrorMsg(undefined)
  passwordElem.setCustomValidity("")
  emailElem.reportValidity()
  emailElem.setCustomValidity("")
  emailElem.reportValidity()
 
  // if PW fields not blank - check if they match
  if (password && confirmPassword) {
  //  handle password matches
     const pwMatch = doPasswordsMatch(password, confirmPassword) 
     if(!pwMatch) {
      // send custom form validation message
       confirmPasswordElem.setCustomValidity("Passwords don't match")
       confirmPasswordElem.reportValidity()
       setPasswordMatchingError(true)
      //  return // early return
     } else {
      // reset any custom form validation message prev set
      confirmPasswordElem.setCustomValidity("")
      confirmPasswordElem.reportValidity()
      setPasswordMatchingError(false)
     }
  }
   // handle required fields validation
   if (form.checkValidity() === false) {
    e.preventDefault()
    setValidated(true)
    return
  } 
  // sends validations back to form
  // build User obj

  const user =
    userType === UserTypes.DONOR
      ? new Donor({ name, email, phone, location, userType, password })
      : new Receiver({ name, email, phone, location, userType, password })
  // add user to db
  // const test = await crudFunctions.addNewUser(user)
  // console.log(test, "HERE")
  // setErrorMsg(test.message)
  const response =  await crudFunctions.createNewUser(user)
  console.log(response, "HERE2")
  // if firebase error send to form
  if (response.status === FunctionStatus.ERROR) {
    if (response.errorCode === 'auth/email-already-in-use') {
      emailElem.setCustomValidity(response.errorMessage)
      emailElem.reportValidity()
      setFireBaseEmailErrorMsg(response.errorMessage)
    } else if(response.errorCode === 'auth/invalid-email') {
      emailElem.setCustomValidity(response.errorMessage)
      emailElem.reportValidity()
      setFireBaseEmailErrorMsg(response.errorMessage)
    } else if(response.errorCode === 'auth/weak-password') {
      passwordElem.setCustomValidity(response.errorMessage)
     emailElem.reportValidity()
      setFireBasePasswordErrorMsg(response.errorMessage)
    } else {
      setErrorMsg(response.errorMessage)
    }
    e.preventDefault()
  } else if(response.status === FunctionStatus.OK) {
    e.preventDefault()
    e.stopPropagation()
    if(response && response.status === FunctionStatus.OK) {
      //ok else {
  
    }

  }
 
  // console.log(response, 'response from createNewUser func')
}


const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword
}
