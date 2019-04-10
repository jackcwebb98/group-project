import React from 'react'
import { Route, Switch} from 'react-router-dom'

//import components here 
import Login from './components/Login';
import AccountCreation from './components/AccountCreation';
import Registration from './components/Registration';
import Profile from './components/ProfilePage'

//add routes to each component you make. make the path "/component name"
export default (
  <Switch>
    <Route path="/profile" component={Profile}/>
    <Route path="/register" component={Registration}/>
    <Route path="/accountcreation" component={AccountCreation}/>
    <Route exact path="/" component={Login} />
  </Switch>
)