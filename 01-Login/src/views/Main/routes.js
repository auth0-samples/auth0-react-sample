import React from 'react'
import {Route, IndexRoute} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <Route path="login" component={Login} />
      <Route path="access_token=:token" component={Login} />
      <IndexRoute component={Home} onEnter={requireAuth} />
    </Route>
  )
}

export default makeMainRoutes
