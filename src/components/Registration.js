import React from 'react';
import axios from 'axios';
import logo from './images/BlackLogo.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



export default class Registration extends React.Component {
  state = {
    username: '',
    password: '',
    passwordCheck: '',
    email: '',
    emailCheck: '',
  }

  // updates state to users input
  handleChange = (prop, val) => { this.setState({ [prop]: val }) }

  // checks if email is not blank and that emails match
  checkEmail = () => {
    if (this.state.email.length < 1) { return false }
    else if (this.state.email.length >= 1) {
      if (this.state.email != this.state.emailCheck) { return false }
      else if (this.state.email === this.state.emailCheck) { return true }
    } else { return true }
  }

  // checks if password is not blank and that passwords match
  checkPassword = () => {
    if (this.state.password.length < 1) { return false }
    else if (this.state.password.length >= 1) {
      if (this.state.password != this.state.passwordCheck) { return false }
      else if (this.state.password === this.state.passwordCheck) { return true }
    } else { return true }
  }

  // clears state and input fields
  handleResetFields = () => { this.setState({ username: '', password: '', passwordCheck: '', email: '', emailCheck: '' }) }

  // checks if password and email blank, if not then it checks if both passwords and emails match if they match then it will proceed with registration
  handleSubmit = async (event) => {
    event.preventDefault()
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
        email: this.state.email
      }
      try {
        let res = await axios.post('/register', user)
        console.log(res.data)
        if (res.data === "username") {
          alert('Pick different Username')
        }
        if (res.data === 'email') {
          alert('Pick different Email')
        } else {
          this.setState({ username: '', password: '', passwordCheck: '', email: '', emailCheck: '' })
          this.props.history.push('/accountcreation')
        }
      } catch (err) { console.log(err) }
    }
  }


  render() {
    const { username, email, emailCheck, password, passwordCheck } = this.state
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Account info
          </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} >
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mail"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Confirm E-mail"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="billing address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Confirm Password"
              fullWidth
              autoComplete="password"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
            // <RegisterPage>
            //     <Form onSubmit={this.handleSubmit} >
            //         {/* <LogoImg src={logo}/> */}
            //             <InputBox>
            //                 <Input value={username} placeholder='Username' maxLength={30} onChange={e=> this.handleChange("username", e.target.value)}/>
            //                 <Input value={email} placeholder='Email' onChange={e=> this.handleChange("email", e.target.value)}/>
            //                 <Input value={emailCheck} placeholder='Retype Email' onChange={e=> this.handleChange("emailCheck", e.target.value)}/>
            //                 <Input type="password" value={password} placeholder='Password' maxLength={30} onChange={e=> this.handleChange("password", e.target.value)}/>
            //                 <Input type="password" value={passwordCheck} placeholder='Retype Password' maxLength={30} onChange={e=> this.handleChange("passwordCheck", e.target.value)}/>
            //             </InputBox>
            //             <RegisterButton>Submit</RegisterButton>
            //     </Form>
            //     <ResetButton onClick={this.handleResetFields}>Clear Fields</ResetButton>
            // </RegisterPage>