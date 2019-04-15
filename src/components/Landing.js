import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyPage from './survey/SurveyPage'
import { PresignedPost } from 'aws-sdk/clients/s3';

export default function Landing(props) {

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    grabUsers();
  }, []);

  async function grabUsers() {
    let user = await axios.get(`/landingpage`).then(res => {
      setUsers(res.data)
      console.log(res.data)
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
      <div onClick={toSurveyPage}>
        {name.profile_pic}
        {name.username}
        <SurveyPage
        data={name}
        />
      </div>
    )
  })

  function toSurveyPage(props){
    props.history.push('/surveypage')
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