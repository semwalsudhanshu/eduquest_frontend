import React, { Component } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiAlert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./Login.css";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      firstname:'',
      lastname:'',
      email: "",
      password: "",
      password2: "",
      errors: {},
      success:'',
      failure:''
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.firstname?this.state.firstname +' '+ this.state.lastname:"",
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    fetch("http://localhost:5000/api/users/register", {
      method: "post",
      // mode:'no-cors',
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) => {
        console.log(res);
        //this.setState({success:res.data.success,failure:res.data.failure})
    });
  };
  render() {
    const { errors, success, failure} = this.state;
    const { classes } = this.props;
    const copyright = (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {failure !== "" && (
          <div className="alert">
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="error"
              onClose={() => this.handleCloseNotification()}
            >
              {failure}
            </MuiAlert>
          </div>
        )}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  onChange = {this.onChange}
                  value = {this.state.firstname}
                  error = {errors.name}
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 onChange = {this.onChange}
                 value = {this.state.lastname}
                 error = {errors.name}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange = {this.onChange}
                  value = {this.state.email}
                  error = {errors.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange = {this.onChange}
                  value = {this.state.password}
                  error = {errors.password}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  onChange = {this.onChange}
                  value = {this.state.password2}
                  error = {errors.password2}
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>{copyright}</Box>
      </Container>
      /*    <div className= "container mt-4">
                <div className="row">
                    <div className = "col s8 offset-s2">
                       
                        <div className="col s12" style ={{
                            paddingLeft:"11.25px"
                        }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey0text text-darken-1">
                                Already have an account ? <Link to ="/login">Login</Link>
                            </p>

                        </div>
                        <form noValidate onSubmit = {this.onSubmit}>
                            <div className = "input-field col s12">
                                <input
                                onChange = {this.onChange}
                                value = {this.state.name}
                                error = {errors.name}
                                id = "name"
                                type ="text"/>
                                <label htmlFor = "name">Name</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange = {this.onChange}
                                value = {this.state.email}
                                error = {errors.email}
                                id ="email"
                                type = "email"/>
                                <label htmlFor = "email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange = {this.onChange}
                                value = {this.state.password}
                                error = {errors.password}
                                id ="password"
                                type = "password"/>
                                <label htmlFor = "password">Password</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                onChange = {this.onChange}
                                value = {this.state.password2}
                                error = {errors.password2}
                                id ="password2"
                                type = "password"/>
                                <label htmlFor = "password2">Confirm Password</label>
                            </div>
                            <div className = "col s12" style ={{
                                paddingLeft:"11.25px"
                            }}>
                                <button style = {{
                                    width :"150px",
                                    borderRadius:"3px",
                                    letterSpacing:"1.5px",
                                    marginTop:"1rem"
                                }}
                                type ="submit"
                                className = "btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         */
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(Register);
