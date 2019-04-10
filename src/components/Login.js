import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'



const InputPassword = styled.input`
position: relative;
left: 30vw;
top: 50vh;
`
const InputUsername = styled.input`
position: relative;
left: 20vw;
top: 50vh;
`

const LoginButton = styled.button`
position: relative;
right: 8vw;
top: 60vh;
`

const PasswordButton = styled.button`
position: relative;
right: 5vw;
top: 60vh;
`

const LogoImg = styled.img`
top: -10vh;
right: 15vw;
position: absolute;
height: 450px;
width: 450px;
`

export default function Login(props){


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser() {
            let user = {
                username: username,
                password: password
            }
            
        try {
            let res = await axios.post('login', user);
         props.updateUser(res.data)
         props.history.push('/landing')
        } catch(err) {
            alert('Incorrect username or password')
        }
    }


    return(

        <div>
        <LogoImg src="https://trello-attachments.s3.amazonaws.com/5ca7c5be629a90869b43bcaa/500x500/edf9959df2fe8efd713e62192ad67d96/E-VAL-U-DATE_BL_BG.png"/>
        <InputUsername value={username} onChange={e => setUsername(e.target.value)}/>
        <InputPassword value={password} onChange={e => setPassword(e.target.value)}/>
        <LoginButton onClick={loginUser}>Login</LoginButton>
        <PasswordButton>Register</PasswordButton>

        </div>
    )

}