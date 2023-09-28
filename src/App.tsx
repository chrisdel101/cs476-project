import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
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


interface CustomRouteProps {
  children: ReactNode
  path?: string
}


// Only acessible when NOT logged in
function NonAuthenticatedRoute({ children }: CustomRouteProps) {
  // const {pathname} = useLocation();
  const auth = useUserContext();
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
    const auth = useUserContext();

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
        <LayoutContainer>
          <Navigation />
          <HeroContainer>
            <Switch>
              <AuthenticatedRoute path={'/add'}>
                <AddUserScreen />
              </AuthenticatedRoute>
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
      </Router>
    </ProvideAuth>
  )
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
