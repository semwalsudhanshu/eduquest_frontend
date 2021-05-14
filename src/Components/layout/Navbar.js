import reducer from "./reducer";
import saga from "./saga";
import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import * as action from "./actions";
import {
  Checkbox,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isLoggedIn } from "../auth/selectors";

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100%)`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    top:"65px"
  },
  rightNavBarContainer: {
    display: `flex`,
    justifyContent: `space-between`,
    maxWidth: "100%",
    marginLeft: "20px",
    flexWrap: "nowrap",
  },
  rightNavBar: {
    maxWidth: "100%",
    marginLeft: "20px",
    flexWrap: "nowrap",
  },
  leftNavbar: {
    marginLeft: "20px",
  },
  drawerPaper: {
    width: drawerWidth,
    top:"65px"
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  },
});
const key = "HomePage";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordionItems: [
        {
          id: "provider",
          title: "Providers",
          expanded: true,
        },
        {
          id: "course",
          title: "Courses",
          expanded: true,
        },
      ],
      providersList: [
        { id: "udemy", title: "Udemy", checked: false },
        { id: "coursera", title: "Coursera", checked: false },
        { id: "edx", title: "EDX", checked: false },
        { id: "skillShare", title: "Skillshare", checked: false },
      ],
      courseList: [
        { id: "ml", title: "Machine Learning", checked: false },
        { id: "cc", title: "Cloud Computing", checked: false },
        { id: "cn", title: "Computer Networks", checked: false },
      ],
      filterData: [],
    };
  }
  componentDidMount() {
    console.log("mount");
  }
  componentDidUpdate(prevProps, prevState) {}
  handleAccordionExpand = (event, item) => {
    console.log(event, event.currentTarget.id);
    let { accordionItems } = this.state;
    let modifyItems =
      accordionItems &&
      accordionItems.map((data) => {
        if (data === item) {
          data.expanded = !data.expanded;
        }
        return data;
      });
    this.setState({ accordionItems: modifyItems });
  };
  handleProviderCheckbox = (item) => {
    let { providersList, filterData } = this.state;
    let present = true;
    let modifyItems =
      providersList &&
      providersList.map((data) => {
        if (data === item) {
          data.checked = !data.checked;
          if (data.checked === false) present = false;
          else present = true;
        }

        return data;
      });
    this.setState({ providersList: modifyItems });
    let options = filterData;
    options = Object.assign([], options);
    console.log(filterData, present, item.title, options);
    if (present === false) {
      var index = options.indexOf(item.title);
      if (index > -1) {
        options.splice(index, 1);
      }
    } else {
      options.push(item.title);
    }
    this.setState({ filterData: options });
    this.props.setFilterOptions(options);
  };
  handleCourseCheckbox = (item) => {
    let { courseList, filterData } = this.state;
    let present = true;
    let modifyItems =
      courseList &&
      courseList.map((data) => {
        if (data === item) {
          data.checked = !data.checked;
          if (data.checked === false) present = false;
          else present = true;
        }
        return data;
      });
    this.setState({ courseList: modifyItems });
    let options = filterData;
    options = Object.assign([], options);
    if (present === false) {
      var index = options.indexOf(item.title);
      if (index > -1) {
        options.splice(index, 1);
      }
    } else {
      options.push(item.title);
    }
    this.setState({ filterData: options });
    this.props.setFilterOptions(options);
  };
  handleSignout = ()=>{
    
    sessionStorage.clear();
  }
  render() {
    const { classes, page } = this.props;
    const { accordionItems, courseList, providersList } = this.state;
    
    let loggedIn=sessionStorage.getItem('loggedIn');
    console.log(loggedIn);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Grid container>
              <Grid
                item
                container
                xs={10}
                spacing={5}
                className={classes.leftNavbar}
              >
                <Typography variant="h6" noWrap>
                  <Link href="/homepage" color="inherit">
                    Home
                  </Link>
                </Typography>
              </Grid>
              <Grid
                xs={2}
                item
                spacing={4}
                container
                className="rightNavBarContainer"
              >
                {!loggedIn && (
                  <Typography
                    variant="h6"
                    noWrap
                    className={classes.rightNavBar}
                  >
                    <Link href="/register" color="inherit">
                      Register
                    </Link>
                  </Typography>
                )}
                {!loggedIn && (
                  <Typography
                    variant="h6"
                    noWrap
                    className={classes.rightNavBar}
                  >
                    <Link href="/login" color="inherit">
                      Login
                    </Link>
                  </Typography>
                )}
                {loggedIn && (
                  <Typography
                    variant="h6"
                    noWrap
                    align="right"
                    className={classes.rightNavBar}
                  >
                    <Link href="/editor" color="inherit">
                      Programming
                    </Link>
                  </Typography>
                )}
                {loggedIn && (
                  <Typography
                    variant="h6"
                    noWrap
                    align="right"
                    className={classes.rightNavBar}
                  >
                    <Link href="/" color="inherit" onClick={()=>this.handleSignout()}>
                      SignOut
                    </Link>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {page === "homepage" && (
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <div>
              {accordionItems &&
                accordionItems.map((item) => (
                  <Accordion expanded={item.expanded} key={item.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      onClick={(e) => this.handleAccordionExpand(e, item)}
                      aria-controls="panel1a-content"
                      id={item.id}
                    >
                      <Typography className={classes.heading}>
                        {item.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {item.id === "provider" &&
                          providersList &&
                          providersList.map((data, index) => (
                            <ListItem button key={`${data.id}+${index}`}>
                              <ListItemIcon>
                                <Checkbox
                                  onClick={() =>
                                    this.handleProviderCheckbox(data)
                                  }
                                  checked={data.checked}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={data.title} />
                            </ListItem>
                          ))}
                        {item.id === "course" &&
                          courseList &&
                          courseList.map((course) => (
                            <ListItem button key={course.id}>
                              <ListItemIcon>
                                <Checkbox
                                  onClick={() =>
                                    this.handleCourseCheckbox(course)
                                  }
                                  checked={course.checked}
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={course.title} />
                            </ListItem>
                          ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = (dispatch) => {
  return {
    setFilterOptions: (data) => dispatch(action.setFilterOptions(data)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default withStyles(useStyles, { withTheme: true })(
  compose(withConnect, withRouter, withReducer, withSaga)(Navbar)
);
