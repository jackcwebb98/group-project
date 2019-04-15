import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from './ProfilePage';


export default function Landing() {

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    grabUsers();
  }, []);

  async function grabUsers() {
    let user = await axios.get(`/landingpage`).then(res => {
      setUsers(res.data)
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
      <div onClick={toProfilePage} className='Search'>
        {name.profile_pic}
        {name.username}
        <ProfilePage
        data={name}
        />
      </div>
    )
  })

  function toProfilePage(){

  }

  return (
    //header comes in here
    <>
      <input type="text" onChange={filteredSearch} />
      <div>
        {mapped}
      </div>
    </>
  )
}