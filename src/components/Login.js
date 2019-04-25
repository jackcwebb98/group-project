import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import logo from "./images/BlackLogo.png";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },

  imgWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "135%"
  },

  img: {
    width: "90vw",
    objectFit: "cover",
    minHeight: "100%",
    minWidth: "100%",
    display: "block", // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  link: {
    textDecoration: "none"
  }
});

function Login(props) {
  const { classes } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: false, password: false });

  useEffect(() => {});
  async function loginUser(username, password, e) {
    if (validate()) {
      e.preventDefault();
      let user = {
        username: username,
        password: password
      };

      try {
        let res = await axios.post("login", user);
        props.history.push("/landing");
      } catch (err) {
        alert("Incorrect username or password");
      }
    }
  }

  const validate = () => {
    let hasError = false;
    if (!username) {
      error.username = hasError = true;
    }
    if (!password) {
      error.password = hasError = true;
    }
    setError({ error });
    return !hasError;
  };

  return (
    <>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className={classes.imgWrap}>
            <img className={classes.img} src={logo} />
          </div>
          <br />
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email or Username</InputLabel>
              <Input
                error={error.username}
                id="email"
                name="email"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                error={error.password}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <br />
            <br />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                loginUser(username, password, e);
              }}
            >
              Sign in
            </Button>

            <Link className={classes.link} to={"/signup"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </Link>
          </form>
        </Paper>
      </main>
    </>
  );
}

export default withStyles(styles)(Login);
