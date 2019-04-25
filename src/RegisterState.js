import React, { Component, createContext } from "react";
import profileHolder from './components/images/ProfileHolder.png'

import axios from 'axios'
import { setTimeout } from "timers";

// Provider and Consumer are connected through their "parent" context
const { Provider, Consumer } = createContext();

// Then create a provider Component
class RegisterState extends Component {
 constructor(props){
   super(props)

   this.state = {
    username: '',
    password: '',
    passwordCheck: '',
    email: '',
    emailCheck: '',
    name:'',
    bio:'',
    url: profileHolder,    
   }
 }

 update = () => {
   this.forceUpdate()
 }

 setUrl = (url) => {
   this.setState({url})
 }

 handleChange = (prop, val) =>{
   
  this.setState({
    [prop]:val
  })

 }

 handleEditSubmit = () =>{

 }

  // checks if email is not blank and that emails match
  checkEmail = () => {
    if (this.state.email.length < 1) { return false }
    else if (this.state.email.length >= 1) {
      if (this.state.email != this.state.emailCheck) { console.log('email not match')  }
      else if (this.state.email === this.state.emailCheck) { return true }
    } else { return true }
  }

  // checks if password is not blank and that passwords match
  checkPassword = () => {
    if (this.state.password.length < 1) { return false }
    else if (this.state.password.length >= 1) {
      if (this.state.password != this.state.passwordCheck) { console.log('password not match') }
      else if (this.state.password === this.state.passwordCheck) { return true }
    } else { return true }
  }

  // checks if password and email blank, if not then it checks if both passwords and emails match if they match then it will proceed with registration
  handleSubmit = async () => {
    console.log('submit clicked')
    if (this.checkEmail() === true) {
      console.log('email match')
    } else { console.log('emails dont match') }
    if (this.checkPassword() === true) {
      console.log('password match')
    } else { console.log('passwords dont match') }
    if (this.checkEmail() === true && this.checkPassword() === true) {
      let user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        bio: this.state.bio,
        profile_pic: this.state.url,
        name: this.state.name
      }
      try {

        let res = await axios.post('/register', user)
        if (res.data === "username") {
          alert('Pick different Username')
        }
        if (res.data === 'email') {
          alert('Pick different Email')
        } else {
          this.setState({ username: '', password: '', passwordCheck: '', email: '', emailCheck: '' })
        }
      } catch (err) { console.log(err) }
    }
  }



 render() {
   return (
     <Provider
       value={{
         url: this.state.url,
         state: this.state,
         handleChange: this.handleChange,
         handleSubmit: this.handleSubmit,
         setUrl: this.setUrl,
         update: this.update
       }}
     >
       {this.props.children}
     </Provider>
   )
 }
}

export { RegisterState }

export default Consumer