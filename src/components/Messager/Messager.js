import React, { useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client'


export default function Messager(props) {
  const [message, setMessage] = useState('')
  const [messagesHistory, setMessageHistory] = useState([])
  const [user_id, setUserId] = useState(0)
  const [user2_id, setUser2Id] = useState(0)
  const [room, setRoom] = useState(0)
  // const [socket, setSocket] = useState(io())
  const [name, setName] = useState('')
  const socket = io()

  useEffect(() =>{
    setSocketListeners()
    return () => {
      socket.disconnect()
    }
  }, [])

  function setSocketListeners() {

    socket.on('sendMsg', msg => {
      console.log(msg)
      let messages = messagesHistory
      messages.push(msg)
      setMessage('')
      setMessageHistory(messages)
    })
  }

  // async function getChat(){
  //   await axios.get(`/getChat/${room}`).then(res =>{
  //     setMessageHistory(res.data)

  //   })
  // }

 function joinRoom(user_id, user2_id) {
    console.log(user2_id, 'user2 id')
    console.log(user_id, 'user1 id')
    user_id = parseInt(user_id)
    user2_id = parseInt(user2_id)
    let highUser
    let lowUser
    if (user_id > user2_id){
      highUser = user_id
      lowUser = user2_id
    } else {
      highUser = user2_id
      lowUser = user_id
    }
    const roomId = highUser + ':' + lowUser
    console.log(roomId)
    setRoom(roomId)
    socket.emit('joinRoom', roomId)
  }

  function sendMessage(){
    socket.emit('sendMsg', {room: room, msg: message, user: user_id})
  }

  const mappedMessages = messagesHistory.map((message, i) =>{
    return(
      <div key={i}>
      <p>name: {message.user}</p>
      <p>Message: {message.msg}</p>
      </div>
    )
  })

 
  return (
    <div style={{marginTop:"99px", marginLeft: "50px"}}>
    <h1>Learn Socket.IO</h1>
    <p>What is your name?</p>
    <input
      type="text"
      placeholder='name'
      value={name}
      onChange={(e) => setName( e.target.value )} />
   

    <p>What is your ID?</p>
   

    <input
      type="integer"
      placeholder='userId'
      value={user_id}
      onChange={(e) => setUserId(e.target.value )} />

    <p>What is your friend Id?</p>
    <input
      type="integer"
      placeholder='friendId'
      value={user2_id}
      onChange={(e) => setUser2Id(e.target.value )} />

    <button onClick={() => joinRoom(user_id, user2_id)}>Join Room</button>


    <h5>You are in room {room}</h5>
    <p>What would you like to say?</p>
    <input
      type="text"
      placeholder='message'
      value={message}
      onChange={(e) => setMessage(e.target.value)} />
    <button onClick={sendMessage}>Send Message</button>
    {mappedMessages}
    </div>
  );
}
