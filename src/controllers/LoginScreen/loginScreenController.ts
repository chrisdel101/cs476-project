import authFunctions from '../../api/authFunctions'
import { FunctionStatus, Routes, UserTypes } from '../../../constants'
import Donor from '../../models/Donor'
import crudFunctions from '../../api/crudFunctions'
import Receiver from '../../models/Receiver'

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  history: any,
  setIsLoggedIn: (bool: boolean) => void,
  setCurrentUser: (user: Donor | null) => void,
  userType: UserTypes,
  setValidated: (bool: boolean) => void 
) => {
  e.preventDefault()
  // weird syntax only for typescript
  const target = e.currentTarget
  const email: string = target?.email?.value
  const password = target?.password?.value
  const {status, data} = await authFunctions.loginUser(email, password)
  // console.log('handleLogin: logged in', data)

  if(!loggedInUser) {
    setValidated(true)
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
        // TODO // invalid user type flash message
      }
    } else {
      // TODO // add flash message
      console.error('handleLogin: error getting user data')
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
    console.log('handleLogout: logged out')
    history.push(Routes.Index)
    setCurrentUser(null)
    setIsLoggedIn(false)
  }
}
