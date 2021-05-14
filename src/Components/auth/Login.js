import React, { Component } from "react";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AuthenticationService from "../../utils/AuthenticationService";
import * as actions from "./actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const key = "auth";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      accessToken: "",
      failureTxt: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    /* fetch("http://localhost:5000/api/users/login",{
            method:'post',
            // mode:'no-cors',
            headers:{
                "Content-type":"application/json",
                "Access-Control-Allow-Origin":"*",
                "Accept":"application/json"

            },
            body:JSON.stringify(userData)

        }).then(res =>console.log(res)) */
    AuthenticationService.executeJwtAuthenticationService(userData)
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("loggedIn", true);
        this.props.userAuthenticated(response.data);
        this.setState({
          accessToken: response.data.token,
          name: response.data.name,
          email: response.data.email,
          isLoggedIn: response.data.success,
          failureTxt: response.data.failure,
        });
        //this.setState({role:response.data.role})
        //console.log(response.data.role);
        //AuthenticationService.setRole(this.state.role)
        AuthenticationService.registerSuccessfulLoginForJwt(
          userData.username,
          response.data.token
        );
        this.props.history.push(`/homepage`);
      })
      .catch((error) => {
        this.setState({ failureTxt: error.response.data.failure });
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  };
  handleCloseNotification = () => {
    this.setState({ failureTxt: "" });
  };
  render() {
    const { errors, failureTxt } = this.state;
    const classes = this.props.classes;
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
        {failureTxt !== "" && (
          <div className="alert">
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="error"
              onClose={() => this.handleCloseNotification()}
            >
              {failureTxt}
            </MuiAlert>
          </div>
        )}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item justify="center">
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>{copyright}</Box>
      </Container>
    );
    /*   <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          {failureTxt!=='' && 
            <MuiAlert elevation={6} variant="filled" severity='error' onClose={()=>this.handleCloseNotification()}>{failureTxt}</MuiAlert>
          }
          <div className="col s8 offset-s2">
            
            <div className="col s12 " style={{ paddingLeft: "11.25px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account?
                <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.25px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    ); */
  }
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticated: (data) => dispatch(actions.userAuthenticated(data)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key, reducer });

export default withStyles(useStyles, { withTheme: false })(
  compose(withConnect, withRouter, withReducer)(Login)
);
