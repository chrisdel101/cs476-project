import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Routes } from '../constants'
import styled from 'styled-components'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import IndexScreen from './components/IndexScreen/IndexScreen'

const App = () => {
  return (
    <Router>
      <Layout>
        <Navigation />
        <Switch>
          <Route path={Routes.Index}>
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
