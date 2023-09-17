import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Routes } from '../constants'
import styled from 'styled-components'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import IndexScreen from './components/IndexScreen/IndexScreen'
import { useState } from 'react'
import { sendEmail } from './utilities/sendEmail'

const App = () => {
  const [feedback, setFeedback] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("arssonist@yahoo.com")
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value)
  }
  const handleSubmit = () => {
    console.log("submitting")
    const template_params = {
      message: feedback,
      email: email,
      from_name: name,
      reply_to: "freebee.cs476@gmail.com",
    }
    console.log(template_params)
    const templateId = 'template_kw5x49q'
    sendEmail(templateId,template_params)
  }

  return (
    <Router>
      <form className="test-mailing">
        <h1>Let's see if it works</h1>
        <div>
          <textarea
            id="test-mailing"
            name="test-mailing"
            onChange={handleChange}            
            placeholder="Post some lorem ipsum here"
            required
            value={feedback}
            style={{ width: '100%', height: '150px' }}
          />
        </div>
        <input
          type="button"
          value="Submit"
          className="btn btn--submit"
          onClick={handleSubmit}
        />
      </form>
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
