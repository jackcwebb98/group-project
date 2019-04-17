import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyPage from './survey/SurveyPage'
import SearchUser from './survey/SearchUser'
import {withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  Grid: {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '100px',
    marginTop: theme.spacing.unit * 2000
    
  },
  search: {
    marginTop: '200px'
  }
})


export default function Landing(props) {

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
      />
    )
  })


  

  return (
       
    <div style={{marginTop:'200px'}}>
      <input className="search" type="text" onChange={filteredSearch} />
      <div style={{margin: '50px'}}>
        {mapped}
      </div>
    </div>
    

  )
}