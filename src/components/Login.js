import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { Link } from 'react-router-dom'



const InputPassword = styled.input`

`
const InputUsername = styled.input`

`

const LoginButton = styled.button`
`

const PasswordButton = styled.button`
`

const LogoImg = styled.img`
hieght: 300px;
width: 80%;
overflow: hidden;
position: absolute;
top: 10vh;
`
const LoginDiv = styled.div`
display:flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: center;
align-content: space-between;
top:20vh;
position:realative;
`

export default function Login(props) {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('')

    async function loginUser(username, password) {
        let user = {
            username: username,
            password: password
        }

        try {
            let res = await axios.post('login', user);

            console.log(res.data.email)
            props.history.push('/landing')
        } catch (err) {
            alert('Incorrect username or password')
        }
    }


    return (
        <>
            <LogoImg src="https://trello-attachments.s3.amazonaws.com/5ca7c5be629a90869b43bcaa/500x500/edf9959df2fe8efd713e62192ad67d96/E-VAL-U-DATE_BL_BG.png" />
            <LoginDiv>
                <InputUsername value={username} onChange={e => setUsername(e.target.value)} />
                <InputPassword value={password} onChange={e => setPassword(e.target.value)} />
                <LoginButton onClick={() => { loginUser(username, password) }}>Login</LoginButton>
                <Link to={'/register'}>
                    <PasswordButton>Register</PasswordButton>
                </Link>
            </LoginDiv>
        </>
    )

}