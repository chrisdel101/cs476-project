import authFunctions from '../../api/authFunctions'
import { Routes, UserTypes } from '../../../constants'
import Donor from '../../models/Donor'
import crudFunctions from '../../api/crudFunctions'
import Receiver from '../../models/Receiver'

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  history: any,
  setIsLoggedIn: (bool: boolean) => void,
  setCurrentUser: (user: Donor | null) => void,
  userType: UserTypes 
) => {
  e.preventDefault()
  // weird syntax only for typescript
  const target = e.currentTarget
  const email: string = target?.email?.value
  const password = target?.password?.value
  const loggedInUser = await authFunctions.loginUser(email, password)
  console.log('handleLogin: logged in', loggedInUser)

  // if logged in, redirect to index
  if (loggedInUser) {
    // - use auth loggedInUser email to get full user details
    const userData = await crudFunctions.getUserByType({
      id: loggedInUser.uid as string,
      userType: userType,
    })
    if(userData) {
      if(userType === UserTypes.DONOR) {
        const user = new Donor(userData) 
        setCurrentUser(user)
        setIsLoggedIn(true)
      } else {
        const user = new Receiver(userData) 
        setCurrentUser(user)
        setIsLoggedIn(true)
      }
      // TODO // invalid user type flash message
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
