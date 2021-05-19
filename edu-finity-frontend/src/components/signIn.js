import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {Link as RouteLink} from 'react-router-dom'
import Elearning from "../images/e-learning.jpg";

//Material UI Components
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
} from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Elearning})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn=(props)=> {
  const classes = useStyles();

  const [state,setState]=useState({
    loginDetails : {
      email : '',
      password: ''
    },
    loginError : false,
    errorMessage : '',
  })

  const [showPassword,setShowPassword]= useState(false);

  //Handle Form Change
  const handleFormChange = e =>{
    const {name, value} = e.target;
    let loginDetails = {...state.loginDetails};
    loginDetails[name] = value;
    setState({...state,loginDetails});

  } 

  const handleSignIn = e => {
    //e.preventDefault();

    //Reset validation
    setState({
        ...state,
        loginError : false,
        errorMessage : ""
    })

    const { loginDetails } = state;
    const loginPostUrl = "http://localhost:5000/rest/api/users/login";

    console.log(loginDetails);
    /* fetch(loginPostUrl,  {
        method : 'POST',
        body : JSON.stringify(loginDetails),
        headers: {'Content-Type' : 'application/json'}
    }).then(response => {
        console.log(response)
        return response.json()
    }).then(json => {
        if(json.auth){
            console.log("User Logged in")
            //window.localStorage.setItem("jwt", json.token);
            //window.localStorage.setItem("email", json.email);
            //props.setAuth(json)
            //props.history.push('/')
        } else {
            setState({
                ...state,
                loginError : true,
                errorMessage : json.message,
                //snackBarStateChange : !this.state.snackBarStateChange
            }, console.log(this.state))
        }
        console.log(json)
    }) */

  }

  //Handle Password Visibility
  const handleClickShowPassword = e => {
    
    setShowPassword(!showPassword);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={state.loginDetails.email}
              onChange={handleFormChange}
            />
            <br />
            <br />
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <OutlinedInput
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={state.loginDetails.password}
                endAdornment={
                  <InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
                }
                onChange={handleFormChange}
              /> 
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>{handleSignIn()}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouteLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouteLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignIn;