import React, { useState, useEffect } from "react";
import axios from "axios";
import checkUser from "../util";
import RadarChart from './charts/Radar'

export default function Profile(props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");

  async function getUser() {
    try {
      let user = await axios.get(`/currentuser`);
      setName(user.data.name);
      setRating(user.data.rating);
      setProfilePic(user.data.profile_pic);
      setBio(user.data.bio);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkUser(props);
    getUser();
  });
  return (
    <div>
      <RadarChart />
      <p>{name}</p>
      <p>{rating}</p>
      <p>{bio}</p>
      <img src={profilePic} alt={name} />
    </div>
  );
}
