import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import CourtsMap from './pages/CourtsMap'

const App = () => {
  return (
    // Route handler to route to different url
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} /> 
        <Route path="/login" component={SignIn} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile" component={Profile} />
        <Route path="/map" component={CourtsMap} />
      </Switch>
    </Router>
  )
}

export default App