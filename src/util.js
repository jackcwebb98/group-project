import axios from "axios";

export async function checkUser(props) {
  let user = await axios.get(`/currentuser`);
  if (user.data === 'no user') {
    props.history.push(`/`)
  }
}


export function findUser(name, lastName) {
  let newUser = name + ' ' + lastName
  return newUser
}

export function addTogether(num1, num2) {
  let value = num1 + num2
  return value
}


export function filteredSearch(e, users) {

  let currentList = [];
  let newList = [];

  if (e !== "") {
    currentList = users;
    newList = currentList.filter(name => {
      const lc = name.username.toLowerCase();
      const username = e.toLowerCase();
      return lc.includes(username);
    });
  } else {
    newList = users;
  }
  return (newList);
}

export function subtractOne(num1){
  let value = num1 -=1
  return value
}