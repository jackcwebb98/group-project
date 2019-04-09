import React from 'react'
import { Route, Switch} from 'react-router-dom'

//import components here 
import Login from './components/Login'

//add routes to each component you make. make the path "/component name"
export default (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
)