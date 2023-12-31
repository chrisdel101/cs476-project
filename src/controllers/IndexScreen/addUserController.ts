import { FunctionStatus, UserTypes } from '../../../constants'
import crudFunctions from '../../api/crudFunctions'
import { UnregisteredUser } from '../../models/SimpleFactory'
import Donor from '../../models/Donor'
import Receiver from '../../models/Receiver'

interface IHandleSubmit {
  e: React.FormEvent<HTMLFormElement>
  currentRadio: UserTypes
  setValidated: (bool: boolean) => void
  setPasswordMatchingError: (bool: boolean) => void,
  setFireBaseEmailErrorMsg: (str: string|undefined) => void,
  setFireBasePasswordErrorMsg: (str: string|undefined) => void,
  setErrorMsg: (str: string|undefined) => void,
  handleCloseAddUserModal: (bool: boolean) => void,
  setSuccessMsg: (str: string|undefined) => void,
  setCurrentUser: (user: Donor|Receiver|null) => void,
  setIsLoggedIn: (bool: boolean) => void,
  isLoggedIn: boolean | null | undefined,
}

export const handleSubmit = async ({
  e,
  currentRadio,
  setValidated,
  setPasswordMatchingError,
  setFireBaseEmailErrorMsg,
  setFireBasePasswordErrorMsg,
  setErrorMsg,
  handleCloseAddUserModal,
  setSuccessMsg,
  setIsLoggedIn,
  setCurrentUser,
  isLoggedIn
}: IHandleSubmit) => {
  
  e.preventDefault()            // stop default submission
  
  if(isLoggedIn) return         // don't allow submit when user logged in
  
  // get user data from form
  const form = e?.currentTarget 
  
  
  const emailElem = form?.email
  const userType = currentRadio
  const passwordElem = form?.password
  const password = passwordElem?.value
  const confirmPasswordElem = form['confirm-password']
  const confirmPassword = confirmPasswordElem?.value

  // reset to default state of any prev errors
  setPasswordMatchingError(false)
  setFireBaseEmailErrorMsg(undefined)
  setFireBasePasswordErrorMsg(undefined)
  passwordElem.setCustomValidity("")
  emailElem.reportValidity()
  emailElem.setCustomValidity("")
  emailElem.reportValidity()
  setErrorMsg(undefined)

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
    setValidated(true)
    return
  } 
  
  // FACTORY PATTERN IMPLEMENTATION
  const unregisteredUser = new UnregisteredUser(e, userType);
  const user = unregisteredUser.CallFactory();
  
  // add user to db
  const response =  await crudFunctions.createNewUser(user)
  
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
    return
  } 

  // close modal
  handleCloseAddUserModal(true)
  // set msg
  setSuccessMsg(`User Successfully Created`)
  setIsLoggedIn(true)
  // attempt to remove PW as plain text
  user && delete user?.password
  setCurrentUser(user)
}

const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword
}
