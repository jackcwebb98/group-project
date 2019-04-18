import axios from "axios";

export async function checkUser(props) {
  let user = await axios.get(`/currentuser`);
  if (user.data === 'no user') {
    props.history.push(`/`)
  }
}


export  function findUser(name, lastName) {
  let newUser = name + ' ' + lastName
  return newUser
}

export function addTogether(num1, num2) {
  let value = num1 + num2
  return value
}

