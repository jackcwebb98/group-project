import React from 'react'

export default class Registration extends React.Component {
    state={
        username: '',
        password: '',
        passwordCheck: '',
        email: '',
        emailCheck:'',

    }
    // updates state to users input
    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }
    // checks if email is not blank and that emails match
    checkEmail = () => {
        if ( this.state.email.length < 1){return false}
        else if(this.state.email.length >= 1){
            if(this.state.email != this.state.emailCheck){return false}
            else if(this.state.email === this.state.emailCheck){return true}
        }
         else {return true}
    }
    
    // checks if password is not blank and that passwords match
    checkPassword = () => {
        if ( this.state.password.length < 1){return false}
        else if(this.state.password.length >= 1){
            if(this.state.password != this.state.passwordCheck){return false}
            else if(this.state.password === this.state.passwordCheck){return true}
        }
         else {return true}        
    }

    // checks if password and email blank, if not then it checks if both passwords and emails match if they match then it will proceed with registration
    handleSubmit = (event) => {        
        event.preventDefault()
        if(this.checkEmail() === true) {
            console.log('email match')
        } else {console.log('email doesnt match')}
        if(this.checkPassword() === true) {
            console.log('password match')
        }if (this.checkEmail()===true && this.checkPassword()===true){this.setState({username: '', password:'', passwordCheck:'', email:'', emailCheck:''})}
    }


    render() {
        const {username, email, emailCheck, password, passwordCheck} = this.state
        console.log(this.state)
        console.log(this.checkEmail(),111)
        console.log(this.checkPassword(),222)
        return (
            <>
                <form form onSubmit={this.handleSubmit} >
                    <input value={username} placeholder='Username' maxLength={30} onChange={e=> this.handleChange("username", e.target.value)}/>
                    <input value={email} placeholder='email' onChange={e=> this.handleChange("email", e.target.value)}/>
                    <input value={emailCheck} placeholder='email' onChange={e=> this.handleChange("emailCheck", e.target.value)}/>
                    <input value={password} placeholder='password' maxLength={30} onChange={e=> this.handleChange("password", e.target.value)}/>
                    <input value={passwordCheck} placeholder='password' maxLength={30} onChange={e=> this.handleChange("passwordCheck", e.target.value)}/>
                    <button>Submit</button>
                </form>
            </>
        )
    }
}