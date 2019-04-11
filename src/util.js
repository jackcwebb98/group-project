import axios from "axios";

export default async function checkUser(props) {
  let user = await axios.get(`/currentuser`);
  if (user.data === 'no user') {
    props.history.push(`/`)
  }
}
