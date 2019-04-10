import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Profile(props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState('');
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");

  async function getUser() {
    let user_id = 1;
    try {
      let user = await axios.get(`/profile/${user_id}`);
      setName(user.data[0].name);
      setRating(user.data[0].rating);
      setProfilePic(user.data[0].profile_pic);
      setBio(user.data[0].bio);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <p>{name}</p>
      <p>{rating}</p>
      <p>{bio}</p>
      <img src={profilePic} alt={name} />
    </div>
  );
}
