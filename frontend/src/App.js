import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} /> 
      </Switch>
    </Router>
  )
}

export default App