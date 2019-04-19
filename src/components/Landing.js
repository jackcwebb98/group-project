import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchUser from './survey/SearchUser'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({
  Grid: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '100px',
    marginTop: theme.spacing.unit * 2000

  },
  search: {
    minWidth: '60%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})


function Landing(props) {
  const { classes } = props;
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    grabUsers();
  }, []);
  

  async function grabUsers() {
    let user = await axios.get(`/landingpage`).then(res => {
      setUsers(res.data)
      setFiltered(res.data)
    }
    )
  }

  function filteredSearch(e) {

    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = users;
      newList = currentList.filter(name => {
        console.log(name, 'hi')
        const lc = name.username.toLowerCase();
        const username = e.target.value.toLowerCase();
        return lc.includes(username);
      });
    } else {
      newList = users;
    }
    setFiltered(newList);
  }


  const mapped = filtered.map(name => {
    return (
      <SearchUser
        key={name.user_id}
        questionee_id={name.user_id}
        username={name.username}
        profile_pic={name.profile_pic}
        bio={name.bio}
      />
    )
  })




  return (

    <div style={{ padding: 25, marginTop: '75px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              onChange={filteredSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              />
          </div>
      <div style={{ padding: 25, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {mapped}
      </div>
    </div>


  )
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);