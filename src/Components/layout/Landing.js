import React, { Component } from "react";
import "./homepage.css";
import { withStyles } from "@material-ui/core/styles";
import coursera from "../../assets/Coursera.png";
import udemy from "../../assets/Udemy.png";
import edx from "../../assets/edx.svg";
import skillshare from "../../assets/Skillshare.png";
import Rating from "@material-ui/lab/Rating";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography, 
  Button,
  Chip,
  Divider,
} from "@material-ui/core";
import database from "../database/courses.json";

const drawerWidth = 250;
const useStyles = (theme) => ({
  root: {
    marginLeft: drawerWidth,
    marginTop: 100,
    marginRight: 50,
  },
  paper: {
    marginTop: 20,
  },
  card: {
    maxHeight: 345,
    display: "flex",
    justifyContent: "start",
  },
  cardContent: {
    alignItems: "start",
    width: 700,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  media: {
    height: 250,
    width: 350,
  },
  rightSection: {
    justifyContent: "end",
    display: "grid",
    
  },
  logo: {
    height: 90,
    width: 160,
  },
});
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: database.courses,
      filterText: "",
      compareList: database.courses,
      logo: {
        Udemy: udemy,
        EDX: edx,
        Coursera: coursera,
        Skillshare: skillshare,
      },
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { filterOptions } = this.props;
    if (filterOptions !== prevProps.filterOptions) {
      if (filterOptions && filterOptions.length === 0) {
        this.setState({ compareList: database.courses });
        return;
      }
      let list =
        database.courses &&
        database.courses.filter((course) => {
          let matched = false;
          filterOptions &&
            filterOptions.map((filter) => {
              if (
                course.domain_type
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase()) ||
                course.provider
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase())
              ) {
                matched = true;
              }
              return matched;
            });
          return matched;
        });
      this.setState({ compareList: list }, () => {
        console.log(list);
      });
    }
  }
  handleFilterText = (event) => {
    let text = event.target.value;
    let list = database.courses;
    let filterList =
      list &&
      list.filter((course) =>
        course.title.toLowerCase().includes(text.toLowerCase())
      );
    this.setState({ courses: filterList });
  };
  getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span className="highlightText">
        {parts.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
        )}
      </span>
    );
  }
  handleSummary = (course) => {
    return (
      course.summary &&
      course.summary.map((summary,index) => (
        <Typography variant="body2" color="textSecondary" component="p" key={summary+index}>
          {this.getHighlightedText(summary, course.domain_type)}
        </Typography>
      ))
    );
  };

  handleInstructorNames = (names) => {
    let list = "";
    names &&
      names.map((name) => {
        list += name.display_name + ", ";
        return list;
      });
    return list.substring(0, list.length - 2);
  };

  handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  render() {
    let { compareList, logo } = this.state;
    const { classes } = this.props;
    let isLoggedIn=sessionStorage.getItem('loggedIn');
    console.log(isLoggedIn);
    return (
      <Grid className={classes.root}>
        {compareList &&
          compareList.map((course, index) => (
            <Paper elevation={3} className={classes.paper} key={index}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={course.image_url}
                  title={course.domain_type}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Divider className={classes.divider} />
                  {this.handleSummary(course)}
                  <Divider className={classes.divider} />
                  <Typography className="typography">
                    <div className="instructorHead">
                      <Chip label="Instructors: " clickable color="secondary" />
                    </div>

                    {course &&
                      course.instructor &&
                      course.instructor.map((tutor,index) => (
                        <Chip label={tutor} clickable color="primary" key={tutor+index} />
                      ))}
                  </Typography>
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={parseFloat(course.rating)}
                    readOnly
                  />
                </CardContent>
                <CardContent className={classes.rightSection}>
                  <CardMedia
                    className={classes.logo}
                    image={logo[course.provider]}
                    title={course.provider}
                  />
                  <Chip label={`₹ ${course.price}`} clickable color="primary" />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleRedirect(course.learn_url)}
                  >
                    visit
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          ))}
        {compareList && compareList.length === 0 && 
        <Paper>
          <Typography>
            No course available!
          </Typography>
        </Paper>}
      </Grid>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(Landing);
