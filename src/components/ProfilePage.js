import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkUser } from '../util';
import RadarChart from "./charts/Radar";
import LineChart from "./charts/Line";
import EditCard from "./EditProfile";
import { Button } from "@material-ui/core";

export default function Profile(props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

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
  });

  useEffect(() => {
    getUser();
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(!dialogOpen);
  };

  const updateUser = async () => {
    let user = {name, bio, profile_pic: profilePic};
    let res = await axios.put(`/editprofile`, user)
    console.log(res)

  };

  console.log(name)
  return (
    <div>
      <EditCard
        bio={bio}
        profilePic={profilePic}
        setName={setName}
        name={name}
        setBio={setBio}
        setProfilePic={setProfilePic}
        dialogOpen={dialogOpen}
        handleDialogOpen={handleDialogOpen}
        updateUser={updateUser}
      />
      <LineChart />
      <RadarChart />
      <Button onClick={handleDialogOpen}>Click</Button>
      <p>{name}</p>
      <p>{rating}</p>
      <p>{bio}</p>
      <img src={profilePic} alt={name} />
    </div>
  );
}
