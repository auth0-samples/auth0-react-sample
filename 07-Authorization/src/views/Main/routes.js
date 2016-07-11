import React from 'react'
import {Route, IndexRedirect, Link} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import Admin from './Admin/Admin'
import Unauthorized from './Unauthorized/Unauthorized'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

// onEnter callback to validate authentication in private routes
const requireAdminAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  } else {
    if (!auth.isAdmin()) {
      replace({ pathname: '/unauthorized' })
    }
  }
}


export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="admin" component={Admin} onEnter={requireAdminAuth} />
      <Route path="login" component={Login} />
      <Route path="unauthorized" component={Unauthorized} />
      <Route path="access_token=:token" component={Login} /> //to prevent router errors
    </Route>
  )
}

export default makeMainRoutes
