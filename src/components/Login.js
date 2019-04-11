import React, {useState} from 'react'
// import styled from 'styled-components'
import axios from 'axios';
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import logo from './images/E-VAL-U-DATE.png'



const styles = theme => ({

    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    body: {
        minWidth: '100%',
        minHeight: '100%',
        color: 'red',
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      backgroundColor: theme.palette.secondary.light,
      marginBottom: theme.spacing.unit * 8,

    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.secondary.main
    },

    imgWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', 
        margin: 25,
    },

    img: {
        width: '100%',
        height: 'auto',
    },

    link: {
        textDecoration: 'none',
    },



  });
  

function Login(props){
    const { classes } = props;

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const [userId, setUserId] = useState('')

    async function loginUser(username, password) {
        let user = {
            username: username,
            password: password
        }

        try {
            let res = await axios.post('login', user);
            props.history.push('/landing')
        } catch (err) {
            alert('Incorrect username or password')
        }
    }


    return (
        <>
        <div className={classes.imgWrap}>
            <img className={classes.img} src={logo}/>
        </div>
        <main className={classes.main}>
            <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email or Username</InputLabel>
                <Input value={username} id="email" name="email" autoComplete="username" autoFocus value={username} onChange={e => setUsername(e.target.value)}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{loginUser(username, password)}}
                >
                    Sign in
                </Button>
                <Link class={classes.link} to={'/register'}>
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
    )
}

export default withStyles(styles)(Login)