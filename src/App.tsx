import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'
import { Routes } from '../constants'
import styled from 'styled-components'
import Footer from './views/components/Footer'
import Navigation from './views/components/Navigation'
import IndexScreen from './views/components/IndexScreen/IndexScreen'
import LoginScreen from './views/components/LoginScreen/components/LoginScreen'
import AddUserScreen from './views/components/AddUserScreen/AddUserScreen'
import { UserTypes } from '../constants'



const App = () => {
  return (
    <Router>
      <LayoutContainer>
        <Navigation />
        <HeroContainer>
          <Switch>
            <Route path={"/add"}>
              <AddUserScreen />
            </Route>
            <Route path={Routes.Login}>
              <LoginUserTypeScreen />
            </Route>
            <Route exact path={Routes.Index}>
              <IndexScreen />
            </Route>
          </Switch>
        </HeroContainer>
        <Footer />
      </LayoutContainer>
    </Router>
  )
}

// toggle bwt Giver and Reciever specfic screen by passing in the user type as a param
const LoginUserTypeScreen = () => {
  const { userType } = useParams<{ userType: UserTypes }>()
  return <LoginScreen userType={userType} />
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
