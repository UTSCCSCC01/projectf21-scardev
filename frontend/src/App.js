import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import ProfileBar from './Components/ProfileTab.js'
import NavigationBar from './Components/NavigationBar.js';
 
// Main entry point to app
const App = () => {
  return (
    // Route handler to route to different url
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} /> 
        <Route path="/login" component={SignIn} />
        <Route path="/profile" component={ProfileBar} />
        <Route path="/navbar" component={NavigationBar} />
      </Switch>
    </Router>
  )
}

export default App