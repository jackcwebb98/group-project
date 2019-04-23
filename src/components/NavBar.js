import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Consumer from '../RegisterState';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import logoWords from './images/wordsOnlyWhite.png'
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  Nav: {
    backgroundColor: theme.palette.primary.dark,
    position: 'fixed',
  },
  img: {
    width: '150px',
    height: 'auto',
  },
  toolbar: {
    margin: '200px'
  }


});



function NavBar(props) {
  const [profilePic, setProfilePic] = useState('');
  const {pathname} = props.location
  const {classes} = props

  useEffect(() => {
    getUser()}) 

    async function handleLogout() {
      await axios.post('/logout')
      setProfilePic('')
      props.history.push('/')
    }

    async function getUser() {
      let user = await axios.get('/currentuser')
      const {profile_pic} = user.data
      setProfilePic(profile_pic)
    }

    function toProfile() {
      props.history.push('/profile')
    }

    if (pathname !== '/register' && pathname !=='/' && pathname!=='/accountcreation' && pathname !=='/signup'){
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.Nav}>
              <Toolbar className={classes.Toolbar}>
                <IconButton onClick={toProfile} className={classes.menuButton} color="inherit" aria-label="Menu">
                  <Avatar src={profilePic} alt='placeholder for profile icon' variant="raised" className={classes.avatar}/>
                </IconButton>
                <div variant="h6" color="inherit" className={classes.grow}>
                  <img src={logoWords} alt="" className={classes.img}/>
                </div>
                <Button onClick={handleLogout} classes={classes.button} color='inherit'>Logout</Button>
              </Toolbar>
            </AppBar>
          </div>
        )        
    } else { return ( null )}

    
    
}
NavBar.proptypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(props => (
  <Consumer>
    {RegisterState => {
      return <NavBar {...props} RegisterState = {RegisterState} />
    }}
  </Consumer>
)))