import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import {withStyles} from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Consumer from '../RegisterState';

const styles = {
    avatar: {
    },
    AppBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "10%"
    },
    notificationBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "12%"
    },
    
    menuButton: {
      color: "red",
      margin: 5,
      
    },
    notification: {
      color: "orange",
    }
    
}



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

    if (pathname !== '/register' && pathname !=='/' && pathname!=='/accountcreation' && pathname !== '/profile' && pathname !=='/signup'){
        return (
            <AppBar className={classes.AppBar}>
              <div className={classes.notificationBox}>
                <Avatar onClick={toProfile} src={profilePic} alt='placeholder for profile icon' className={classes.avatar}/>
              </div>
              <button onClick={handleLogout} >Logout</button>
            </AppBar>
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