import authFunctions from '../../api/authFunctions'
import { FunctionStatus, Routes, UserTypes } from '../../../constants'
import Donor from '../../models/Donor'
import crudFunctions from '../../api/crudFunctions'
import Receiver from '../../models/Receiver'

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  setIsLoggedIn: (bool: boolean) => void,
  setCurrentUser: (user: Donor | null) => void,
  userType: UserTypes,
  setValidated: (bool: boolean) => void,
  setErrorMsg: (str: string|undefined) => void
) => {
  e.preventDefault()
  // weird syntax only for typescript
  const target = e.currentTarget
  const email: string = target?.email?.value
  const password = target?.password?.value
  const {status, data, errorMessage} = await authFunctions.loginUser(email, password)

  if(!(status === FunctionStatus.OK && data)) {
    setValidated(true)
    setErrorMsg(errorMessage)
  }

  // if logged in, redirect to index
  if (status === FunctionStatus.OK && data) {
    // - use auth loggedInUser email to get full user details
    const userData = await crudFunctions.getUserByType({
      id: data?.uid,
      userType: userType,
    })
    if(userData) {
      if(userType === UserTypes.DONOR) {
        const user = new Donor(userData) 
        setCurrentUser(user)
        setIsLoggedIn(true)
      } else if (userType === UserTypes.RECEIVER) {
        const user = new Receiver(userData) 
        setCurrentUser(user)
        setIsLoggedIn(true)
      } else {
        console.error('Invalid User Type: is user type correct, check server logs') 
        setErrorMsg('Invalid User Type: is user type correct, check server logs')
      }
    } else {
      console.error('handleLogin: error getting user data. Possible wrong login user type')
      setErrorMsg('handleLogin: error getting user data. Possible wrong login user type')
      // - if auth was successful not not userData this sets auth to true on server side and next call will say user is logged in
      // - use logout to null the server side back to false
      await authFunctions.logoutUser()
    }
  }
}
// TODO move to nav bar
export const handleLogout = async (
  history: any,
  setCurrentUser: any,
  setIsLoggedIn: any
) => {
  const isLoggedOut = await authFunctions.logoutUser()
  if (isLoggedOut) {
    console.log('Logged out')
    history.push(Routes.Index)
    setCurrentUser(null)
    setIsLoggedIn(false)
  }
}
