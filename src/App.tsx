import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { Routes } from '../constants'
import styled from 'styled-components'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import IndexScreen from './components/IndexScreen/IndexScreen'
import LoginScreen from './components/LoginScreen/components/LoginScreen'

const LoginScreenToggle = () => {
  const  {userType} = useParams<{ userType: string }>();
  return <LoginScreen userType={userType} />
}

const App = () => {
  

  return (
    <Router>
    
      <Layout>
        <Navigation />
        <Switch>
          <Route path={Routes.Login}>
            <LoginScreenToggle />
          </Route>
          <Route exact path={Routes.Index}>
            <IndexScreen />
          </Route>
        </Switch>
        <Footer />
      </Layout>
    </Router>
  )
}

export default App

const Layout = styled.div`
  background-color: #cccccc;
  width: 100%;
  overflow-y: scroll;
`
