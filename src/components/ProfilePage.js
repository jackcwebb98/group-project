import React, { useState, useEffect } from 'react'



//still needs to pull information from the db then set state with that info


export default function Profile(props) {
  const [name, setName] = useState('Todd')
  const [rating, setRating] = useState(5)
  const [profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWMmLndMODjmWIgknl1Ym7pylQdtQt5WThW6LqREbds_01YV9')
  const [bio, setBio] = useState('im sad')

  return (
    <div>
      <p>{name}</p>
      <p>{rating}</p>
      <p>{bio}</p>
      <img src={profilePic} alt={name}/>
    </div>
  )
}