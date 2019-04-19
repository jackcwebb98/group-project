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

const styles = theme => {};
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

  const handleBoth = () => {
    handleDialogOpen();
    updateUser();
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialogOpen}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContentText>Name</DialogContentText>
        <TextField
          defaultValue={name}
          onChange={e => setName(e.target.value)}
        />
        <DialogContentText>Bio</DialogContentText>
        <TextField
          defaultValue={bio}
          onChange={e => setBio(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleBoth}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>

    //AMAZON S3 stuff still needs to go in the dialog
  );
}

export default withStyles(styles)(EditCard);
