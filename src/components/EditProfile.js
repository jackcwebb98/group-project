import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withStyles,
  Dialog,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import AccountCreation from './AccountCreation'
import Consumer from './../RegisterState'
import registerState from './../RegisterState'


const styles = theme => { };
function EditCard(props) {
  const {
    bio,
    profilePic,
    setName,
    name,
    setBio,
    setProfilePic,
    dialogOpen,
    handleDialogOpen,
    updateUser
  } = props;

  const [profile_Pic, setProfile_Pic] = useState(props.profilePic)
  const handleBoth = () => {
    handleDialogOpen();
    updateUser();
  };


  return (
    <div >
      <Dialog open={dialogOpen} onClose={handleDialogOpen} style={{ marginLeft: '-11%', marginRight: '-11%' }}>
        <div style={{ margin: '19px' }}>
          <AccountCreation
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
          <DialogContentText>Name</DialogContentText>
          <TextField
            defaultValue={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
          <DialogContentText>Bio</DialogContentText>
          <TextField
            defaultValue={bio}
            multiline='true'
            maxLength='140'
            fullWidth
            onChange={e => setBio(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleBoth}>Submit</Button>
          </DialogActions>
          {profilePic}
        </div>

      </Dialog>
    </div>

    //AMAZON S3 stuff still needs to go in the dialog
  );
}

console.log(registerState, 12341232132131);
export default (props => (
  <Consumer>
    {registerState => {
      return <EditCard {...props} registerState={registerState} />
    }}
  </Consumer>
))
