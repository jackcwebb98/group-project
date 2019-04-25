import React from "react";
import axios from "axios";
import logo from "./images/BlackLogo.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Consumer from "./../RegisterState";

class Registration extends React.Component {
  constructor(props) {
    super();
    this.state = {
      error: {
        username: false,
        email: false,
        emailConfirm: false,
        password: false,
        confirmPassword: false
      }
    };
  }

  render() {
    const {error} = this.state
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Account info
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              onChange={e =>
                this.props.registerState.handleChange(
                  "username",
                  e.target.value
                )
              }
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoComplete="username"
              error={this.props.registerState.state.error.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e =>
                this.props.registerState.handleChange("email", e.target.value)
              }
              required
              id="email"
              name="email"
              label="E-mail"
              fullWidth
              autoComplete="email"
              error={this.props.registerState.state.error.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e =>
                this.props.registerState.handleChange(
                  "emailCheck",
                  e.target.value
                )
              }
              required
              id="email"
              name="email"
              label="Confirm E-mail"
              fullWidth
              autoComplete="email"
              error={this.props.registerState.state.error.emailConfirm}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e =>
                this.props.registerState.handleChange(
                  "password",
                  e.target.value
                )
              }
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              autoComplete="billing address-line2"
              error={this.props.registerState.state.error.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={e =>
                this.props.registerState.handleChange(
                  "passwordCheck",
                  e.target.value
                )
              }
              required
              id="password"
              name="password"
              label="Confirm Password"
              type="password"
              fullWidth
              autoComplete="password"
              error={this.props.registerState.state.error.confirmPassword}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default props => (
  <Consumer>
    {registerState => {
      return <Registration {...props} registerState={registerState} />;
    }}
  </Consumer>
);
