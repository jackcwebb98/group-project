require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000000000000 }
  })
)

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('server connected');
  app.listen(SERVER_PORT, () =>
    console.log(`listening on server ${SERVER_PORT}`)
  );
});

app.get(`/currentuser`) //pull user off sessions
app.get(`/profile`) //pull user_id from sessions and name, password, bio, profile pic, email address from body
app.get(`/landingpage`)
app.get(`/surveypage`)

app.post(`/login`) //pull username & password off body
app.post(`register`) //pull username & password off body
app.post(`/accountcreation`) //pull name, bio, profile image, email address off body
app.post(`/editprofile`) //pull user_id from sessions and name, password, bio, profile pic, and email address from body
app.post(`/surveysubmit`) //pull answer val from body