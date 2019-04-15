import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from './images/BlackLogo.png';

const RegisterPage = styled.div`
display:flex;
flex-direction: column;
height: 100%;
width: 100%;
align-items: center;
`
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`

const InputBox = styled.div`
display:flex;
flex-direction: column;
justify-content:space-evenly;
align-items: center;
`
const Input = styled.input`
margin: 5px;
background: rgb(247,247,247, 0.6);
border-radius: 10px;
border: none;
text-align:center;
width: 20em;
height: 2em;
`

const RegisterButton = styled.button`
margin: 5px;
background: #FC510B;
width: 160px;
border-radius: 10px;
`
const ResetButton = styled.button`
margin: 5px;
background: #FC510B;
width: 160px;
border-radius: 10px;
`

const LogoImg = styled.img`
// top: -10vh;
// right: 15vw;
// position: absolute;
height: 450px;
width: 450px;
margin:bottom 5px;
`

export default class Registration extends React.Component {
  state={
    username: '',
    password: '',
    passwordCheck: '',
    email: '',
    emailCheck:'',

  }
  // updates state to users input
  handleChange = (prop, val) => {this.setState({[prop]: val})}

  // checks if email is not blank and that emails match
  checkEmail = () => {
    if ( this.state.email.length < 1){return false}
    else if(this.state.email.length >= 1){
      if(this.state.email != this.state.emailCheck){return false}
        else if(this.state.email === this.state.emailCheck){return true}
    }else {return true}
  }
    
  // checks if password is not blank and that passwords match
  checkPassword = () => {
    if ( this.state.password.length < 1){return false}
    else if(this.state.password.length >= 1){
      if(this.state.password != this.state.passwordCheck){return false}
      else if(this.state.password === this.state.passwordCheck){return true}
    }else {return true}        
  }

  // clears state and input fields
  handleResetFields = () => {this.setState({username: '', password:'', passwordCheck:'', email:'', emailCheck:''})}

  // checks if password and email blank, if not then it checks if both passwords and emails match if they match then it will proceed with registration
  handleSubmit = async (event) => {        
    event.preventDefault()
    if(this.checkEmail() === true) {
      console.log('email match')
    } else {console.log('emails dont match')}
    if(this.checkPassword() === true) {
      console.log('password match')
    } else {console.log('passwords dont match')}
    if(this.checkEmail()===true && this.checkPassword()===true){
    let user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    try{
      let res = await axios.post('/register', user)
      console.log(res.data)
      if(res.data === "username") {
        alert('Pick different Username')
      }
      if(res.data === 'email') {
        alert('Pick different Email')
      } else {
        this.setState({username: '', password:'', passwordCheck:'', email:'', emailCheck:''})
        this.props.history.push('/accountcreation')
      }
    } catch (err) {console.log(err)}
        }
  }


    render() {
        const {username, email, emailCheck, password, passwordCheck} = this.state
        return (
            <RegisterPage>
                <Form onSubmit={this.handleSubmit} >
                    {/* <LogoImg src={logo}/> */}
                        <InputBox>
                            <Input value={username} placeholder='Username' maxLength={30} onChange={e=> this.handleChange("username", e.target.value)}/>
                            <Input value={email} placeholder='Email' onChange={e=> this.handleChange("email", e.target.value)}/>
                            <Input value={emailCheck} placeholder='Retype Email' onChange={e=> this.handleChange("emailCheck", e.target.value)}/>
                            <Input type="password" value={password} placeholder='Password' maxLength={30} onChange={e=> this.handleChange("password", e.target.value)}/>
                            <Input type="password" value={passwordCheck} placeholder='Retype Password' maxLength={30} onChange={e=> this.handleChange("passwordCheck", e.target.value)}/>
                        </InputBox>
                        <RegisterButton>Submit</RegisterButton>
                </Form>
                <ResetButton onClick={this.handleResetFields}>Clear Fields</ResetButton>
            </RegisterPage>
        )
    }
}