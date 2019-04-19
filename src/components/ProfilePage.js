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

    width: '400px',
    objectFit: 'cover',
    minHeight: '700px',
    minWidth: '100%',
    display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  test: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: '25px',
    paddingLeft: '15px',
    paddingRight: '15px'
  }
})


function Profile(props) {
  const { classes } = props;
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
    let user = { name, bio, profile_pic: profilePic };
    let res = await axios.put(`/editprofile`, user)
    console.log(res)

  };

  console.log(name)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', }}>
      <div style={{ width: '40%' }}>
        <LineChart />
        <RadarChart />
      </div>
      <div style={{ padding: 5, }}>
        <Grid container spacing={40} className={classes.cardGrid}>
          <Grid item xs={10} md={6}>
            <Card className={classes.card}>
              <div className={classes.test}>
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
                    <h2>{name}</h2>
                    <p>{rating}</p>
                    <p>{bio}</p>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    > Take Survey
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
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
    </div>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile)
