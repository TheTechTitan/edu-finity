import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//Material UI Components
import {
  InputAdornment,
  OutlinedInput,
  InputLabel,
  IconButton,
} from '@material-ui/core';

//Material UI Icons
import { Visibility, VisibilityOff } from '@material-ui/icons';


import {Link as RouteLink} from 'react-router-dom'

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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const SignUp=()=> {
  const classes = useStyles();

  const [state,setState]=useState({
    registerDetails : {
      firstName: '',
      lastName: '',
      email : '',
      password: '',
      confirmPassword: ''
    },
  })

  const [showPassword,setShowPassword]= useState(false);
  const [showConfirmPassword,setShowConfirmPassword]= useState(false);

  //Handle Form Change
  const handleFormChange = e =>{
    const {name, value} = e.target;
    let registerDetails = {...state.registerDetails};
    registerDetails[name] = value;
    setState({...state,registerDetails});

  } 

  const handleSignUp = e=>{
    //e.preventDefault();

    const registerPostUrl = "http://localhost:9191/services/users";
    const registerDetails = state.registerDetails;

    const registerData = {
        firstName : registerDetails.firstName,
        lastName : registerDetails.lastName,
        emailAddress : registerDetails.email,
        password : registerDetails.password,
        membership:"Platinum"
    }

    console.log(registerData);

    //Post Details
    /* fetch(registerPostUrl, {
        method : 'POST',
        body : JSON.stringify(registerData),
        headers: {'Content-Type' : 'application/json'}
    }).then(response => {
        return response.json()
    }).then(json => {
        if(json.user){
            console.log("User already Exists")
        }
        if(json.created){
            console.log("User Created");
            this.props.history.push('/login')
        }
        console.log(json)
    }) */
  }

  //Handle Password Visibility
  const handleClickShowPassword = e => {
    console.log("here handle");
    setShowPassword(!showPassword);
  }

  const handleClickShowConfirmPassword = e => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="fname"
                value={state.registerDetails.firstName}
                onChange={handleFormChange}
              />              
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={state.registerDetails.lastName}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.registerDetails.email}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
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
                value={state.registerDetails.password}
                endAdornment={
                  <InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
              }
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel htmlFor="adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="confirm-password"
                value={state.registerDetails.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                      <IconButton aria-label="Toggle password visibility" onClick={handleClickShowConfirmPassword}>
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
                }
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{handleSignUp()}}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouteLink to="/signin" variant="body2">
                Already have an account? Sign in
              </RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default SignUp;