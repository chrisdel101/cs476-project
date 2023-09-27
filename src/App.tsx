import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { Routes } from '../constants'
import styled from 'styled-components'
import Footer from './views/components/Footer'
import Navigation from './views/components/Navigation'
import IndexScreen from './views/components/IndexScreen/IndexScreen'
import LoginScreen from './views/components/LoginScreen/components/LoginScreen'
import AddUserScreen from './views/components/AddUserScreen/AddUserScreen'
import { UserTypes } from '../constants'
import useUserSessions from './controllers/hooks/sessions/useUserSessions'
import { Auth } from 'firebase-admin/auth'
import { AuthenticatedLayout } from './views/components/AuthenticatedLayout'
import { ReactNode, createContext, useContext } from 'react'
import User from './models/abstractClasses/User'
import authFunctions from './api/authFunctions'

interface LoginUserTypeOnAuthInterface {
  isLoggedIn: boolean
}
interface IUserContext {
  currentUser?: User | null
  isLoggedIn?: boolean
}

const authContext = createContext<IUserContext>({
  currentUser: undefined,
  isLoggedIn: false,
})
interface UserProviderProps {
  children: ReactNode
}
interface CustomRouteProps {
  children: ReactNode
  path?: string
}

function ProvideAuth({ children }: UserProviderProps) {
  const { currentUser, isLoggedIn } = useUserSessions()
  return (
    <authContext.Provider value={{ currentUser, isLoggedIn }}>
      {children}
    </authContext.Provider>
  )
}

function useAuth() {
  return useContext(authContext)
}

// Only acessible when not logged in
function NonAuthenticatedRoute({ children }: CustomRouteProps) {
  // const {pathname} = useLocation();
  const auth = useAuth()
  // console.log('locaton ', auth.currentUser  )
  return (
    <Route
      render={() =>
        auth.currentUser ? <Redirect to={Routes.Index} /> : children
      }
    />
  )
}

// Only acessible when user logged in
function AuthenticatedRoute({ children }: CustomRouteProps) {
  const { pathname } = useLocation()
  console.log('pathname ', pathname)
  const auth = useAuth()
  // console.log('auth.currentUser ', auth.currentUser  )
  return (
    <Route
      render={() =>
        auth.currentUser ? children : <Redirect to={Routes.Index} />
      }
    />
  )
}

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        {/* <AuthenticatedLayout> */}
        <LayoutContainer>
          <Navigation />
          <HeroContainer>
            <Switch>
              <AuthenticatedRoute path={'/add'}>
                <AddUserScreen />
              </AuthenticatedRoute>
              {/* <Route path={'/add'}>
                <AddUserScreen />
              </Route> */}
              <NonAuthenticatedRoute path={Routes.Login}>
                <LoginScreen />
              </NonAuthenticatedRoute>
              <Route exact path={Routes.Index}>
                <IndexScreen />
              </Route>
            </Switch>
            z
          </HeroContainer>
          <Footer />
        </LayoutContainer>
        {/* </AuthenticatedLayout> */}
      </Router>
    </ProvideAuth>
  )
}
// toggle bwt Giver and Reciever specfic screen by passing in the user type as a param
const LoginUserTypeOnAuthScreen = ({
  isLoggedIn,
}: LoginUserTypeOnAuthInterface) => {
  // if (isLoggedIn) {
  //   console.log("APP logged in", isLoggedIn)
  //   return <Redirect to={Routes.Index} />
  // } else {
  console.log('APP not  logged in')
  // takes the userType in /log_in/:userType
  const { userType } = useParams<{ userType: UserTypes }>()
  return <LoginScreen userType={userType} />
  // }
}
export default App

// HERO styles for all pages
const HeroContainer = styled.div`
  height: 500px;
  width: 100%;
`
// LAYOUT styles for all pages
const LayoutContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  overflow-y: scroll;
`
