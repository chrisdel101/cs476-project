import authFunctions from '../../api/authFunctions'
import { Routes } from '../../../constants'
import Donor from '../../models/Donor'

export const handleLogin = async (e:React.FormEvent<HTMLFormElement>, history: any, setIsLoggedIn: any, setCurrentUser:any) => {
  e.preventDefault()
    // weird syntax only for typescript
    const target = e.currentTarget
    const email = target.email.value 
    const password = target.password.value
    const loggedInUser = await authFunctions.loginUser(email, password)
    // if logged in, redirect to index
    if(loggedInUser) {
      // TODO- use loggedInUser email to get full user details
      // TODO - build User obj
      console.log('handleLogin: logged in', loggedInUser?.email)
      history.push(Routes.Index);
      // TEMP fix adding user to login for now
      setCurrentUser(new Donor({email: loggedInUser.email}))
      setIsLoggedIn(true) 
    }
}
// TODO move to nav bar
export const handleLogout = async (history: any, setCurrentUser: any, setIsLoggedIn: any) => {
  const isLoggedOut = await authFunctions.logoutUser()
  if(isLoggedOut) {
    console.log('handleLogout: logged out')
    history.push(Routes.Index);
    setCurrentUser(null)
    setIsLoggedIn

  }
}
