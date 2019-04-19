import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkUser } from '../util';
import RadarChart from "./charts/Radar";
import LineChart from './charts/Line';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { BounceLoader } from 'react-spinners';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Consumer from "../RegisterState";
import EditCard from "./EditProfile";


const styles = theme => ({
  card: {

    width: '60%',
    objectFit: 'cover',
    minHeight: '700px',
    minWidth: '100%',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardMedia: {
    objectFit: 'scale-down',
    height: '450px',
    width: '400px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'row'
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: '25px',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  chart: {
    margin: '15px',
    display: 'flex',
    width: '80%',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '45%',
      height: 'auto',
      padding: '25px'
    },
  }
})


function Profile(props) {
  const { classes } = props;
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  async function getUser() {
    try {
      let user = await axios.get(`/currentuser`);
      setName(user.data.name);
      setRating(user.data.rating);
      setProfilePic(user.data.profile_pic);
      setBio(user.data.bio);
      setUsername(user.data.username);
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
    let user = { name, bio, profile_pic: profilePic, username };
    let res = await axios.put(`/editprofile`, user)
    console.log(res)

  };

  console.log(name)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '75px', marginRight: '3%', marginLeft: '3%', marginBottom: '2%' }}>
      <Card className={classes.card}>
        <div className={classes.wrap}>
          <div>
            <div style={{ width: '100%' }}>
              <CardMedia
                className={classes.cardMedia}
                image={profilePic} // eslint-disable-line max-len
                title="Image title"
              />
            </div>
          </div>
          <div className={classes.cardDetails}>
            <CardContent>
              <h2>{name},</h2>
              <h2>{username}</h2>
              <p>{rating}</p>
              <p>{bio}</p>
              <Button
                onClick={handleDialogOpen}
                variant="contained"
                color="primary"
                className={classes.button}
              > Edit Profile
                    </Button>
            </CardContent>
          </div>
        </div>
        <div>
          <Card >
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
            <div  style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', justifyItems: 'center'}}>
              <div className={classes.chart}>
                <LineChart />
              </div>
              <div className={classes.chart}>
                <RadarChart />
              </div>
            </div>

          </Card>
        </div>
      </Card>
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile)
