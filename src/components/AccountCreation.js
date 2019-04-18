import React, { Component } from 'react';
import axios from 'axios';
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
import profileHolder from './images/ProfileHolder.png'


const styles = theme => ({
  card: {
    width: 345,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    height: 300,
  },
  cardWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // width: '135%',
  },
});

class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: profileHolder,
      bio: '',
      name: ''
    };
  }

  getSignedRequest = ([file]) => {
    console.log(file)
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;


    axios
      .get('/api/sign-s3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };



    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed url failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
            err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  async handleChange(prop, val) {
    await this.setState({
      [prop]: val
    })
  }

  create = async () => {
    let userInfo = {
      bio: this.state.bio,
      profile_pic: this.state.url,
      name: this.state.name
    }
    try {
      let res = await axios.post('/accountcreation', userInfo)
      this.props.history.push('/landing')
    } catch (err) {
      console.log(err)
    }
  }

  render(props) {
    const { classes } = this.props;
    const { url, isUploading, bio, name } = this.state;
    console.table(this.state)
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Profile info
        </Typography>
        <div className={classes.cardWrap}>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={this.state.url}
              />
              <CardContent>
                <Dropzone
                  onDropAccepted={this.getSignedRequest}
                  style={{
                    position: 'relative',
                    // width: '60vw',
                    // height: '20vh',
                    margin: 10,
                    border: 'none',
                    borderColor: 'rgb(102, 102, 102)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 28,
                    background: 'rgb(247,247,247, 0.6)',

                  }}
                  accept="image/*"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div>
                        {isUploading
                          ?
                          <BounceLoader style={{}} />
                          :
                          <p>Drag 'n' drop some files here, or click to select files</p>}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <br />
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              required
              id="Name"
              name="Name"
              label="First and last name"
              fullWidth
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="bio"
              name="bio"
              label="Bio"
              fullWidth
              multiline='true'
              rows='4'
            />
          </Grid>
        </Grid>

      </React.Fragment>
    );
  }
}

AccountCreation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountCreation);

