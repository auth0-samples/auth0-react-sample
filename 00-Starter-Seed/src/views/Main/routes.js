import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Container from './Container'
import Home from './Home/Home'

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      <IndexRoute component={Home} />
    </Route>
  )
}

export default makeMainRoutes
