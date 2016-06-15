import React from 'react'
import {Route, IndexRoute} from 'react-router'
import auth from 'utils/auth'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      <Route path="login" component={Login} />
      <Route path="access_token=:token" component={Login} />
      <IndexRoute component={Home} onEnter={requireAuth} />
    </Route>
  )
}

export default makeMainRoutes
