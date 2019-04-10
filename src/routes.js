import React from 'react'
import { Route, Switch} from 'react-router-dom'

//import components here 
import Login from './components/Login'
import Registration from './components/Registration'

//add routes to each component you make. make the path "/component name"
export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Registration} />
  </Switch>
)