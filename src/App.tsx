import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
} from 'react-router-dom'
import { Routes } from '../constants'
import styled from 'styled-components'
import Footer from './views/components/Footer'
import Navigation from './views/components/Navigation'
import IndexScreen from './views/components/IndexScreen/IndexScreen'
import LoginScreen from './views/components/LoginScreen/LoginScreen'
import AddUserScreen from './views/components/AddUserScreen/AddUserScreen'
import { ProvideAuth } from './controllers/context/userProvider'
import useUserContext from './controllers/context/useUserContext'
import { ReactNode } from 'react'
import AccountScreen from './views/components/AccountScreen/AccountScreen'

interface CustomRouteProps {
  children: ReactNode
  path?: string
}

// Only acessible when NOT logged in
function NonAuthenticatedRoute({ children, ...rest }: CustomRouteProps) {

  const auth = useUserContext()
  return (
    <Route
    {...rest}
      render={() =>
        auth.currentUser ? <Redirect to={Routes.Index} /> : children
      }
    />
  )
}

// Only acessible when user logged in
function AuthenticatedRoute({ children, ...rest }: CustomRouteProps) {
  const { pathname } = useLocation()
  console.log('pathname ', pathname)
  const auth = useUserContext()

  // console.log('auth.currentUser ', auth.currentUser  )
  return (
    <Route
    {...rest}
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
        <LayoutContainer>
          <Navigation />
          <HeroContainer>
            <Switch>
              <Route path={Routes.Account}>
                <AccountScreen />
              </Route>
              <NonAuthenticatedRoute path={Routes.Login}>
                <LoginScreen />
              </NonAuthenticatedRoute>
              <Route exact path={Routes.Index}>
                <IndexScreen />
              </Route>
            </Switch>
          </HeroContainer>
          <Footer />
        </LayoutContainer>
      </Router>
    </ProvideAuth>
  )
}

export default App

// HERO styles for all pages
const HeroContainer = styled.div`
  min-height: 500px;
  width: 100%;
  display: flex
`
// LAYOUT styles for all pages
const LayoutContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  overflow-y: scroll;
`
