import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Card,
  Avatar,
  Paper,
  CardContent,
  CardHeader,
  Badge,
  CardMedia,
  CardActions,
  Button as NormalButton,
} from "@material-ui/core";
import axios from "axios";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.png";
import userIcon from "../../../images/dashboard/usericon.png";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./MyPitchesStyle"; // Component Styles

const MyPitches = () => {
  let history = useHistory();
  const classes = useStyles();
  const [usersPitches, setUsersPitches] = useState([]);
  const [isSet, setIsSet] = useState(false);

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  // Get User's Pitches
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/pitches/userspitches",
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      // Set users pitches to response data of GET
      setUsersPitches(response.data);
      setIsSet(true);
    });
    // Access Token Check
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  // Delete User's Pitch
  const deletePitch = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:3001/pitches/${id}`, // Delete Pitch by ID
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      // If successfully deleted, refresh page
      if (response.status === 200) {
        history.go(0);
      }
    });
  };

  if (isSet) {
    // If No pitches for user then return -
    if (usersPitches.length === 0) {
      return (
        <div className={classes.root}>
          <Grid
            container
            justify="center"
            style={{ minHeight: "100vh", maxWidth: "100%" }}
          >
            <Grid item xs={12} style={{ paddingTop: "2%" }}>
              <Container maxWidth="lg">
                <Typography
                  className={classes.h1}
                  style={{ paddingBottom: "5%" }}
                >
                  You have no pitches
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      // If the user has pitches then return -
      return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <div className={classes.root}>
            <Grid
              container
              justify="center"
              style={{ minHeight: "100vh", maxWidth: "100%" }}
            >
              <Grid item xs={12} style={{ paddingTop: "2%" }}>
                <Container maxWidth="lg">
                  <Typography
                    className={classes.h1}
                    style={{ paddingBottom: "5%" }}
                  >
                    Your Pitches
                  </Typography>
                  <Grid container spacing={3}>
                    {/* List of user's pitches starts here */}
                    {usersPitches.map((value, key) => {
                      return (
                        <Grid item xs={12} md={4} lg={4}>
                          {/* Pitch card starts here */}
                          <Paper className={classes.paper}>
                            <Card className={classes.card}>
                              <CardContent>
                                <CardHeader
                                  avatar={
                                    <Link to={`profile/${value.UserId}`}>
                                      <Avatar>
                                        <img
                                          src={userIcon}
                                          alt=""
                                          width="50px"
                                          height="35px"
                                        />
                                      </Avatar>
                                    </Link>
                                  }
                                  titleTypographyProps={{ variant: "h6" }}
                                  title={value.pitchTitle}
                                  subheader={
                                    <Badge className={classes.badge}>
                                      {value.location}, {value.country}
                                      <Location />{" "}
                                    </Badge>
                                  }
                                />
                                <CardMedia
                                  className={classes.media}
                                  image={cardImage}
                                />
                                <Typography
                                  className={classes.p1}
                                  style={{ marginTop: "3%" }}
                                >
                                  {value.pitchInfo.length > 100
                                    ? `${value.pitchInfo.substring(0, 100)}...`
                                    : value.pitchInfo}
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    paddingTop: "0.5em",
                                  }}
                                >
                                  <Typography
                                    className={classes.p1}
                                    style={{ marginTop: "3%" }}
                                  >
                                    Amount raised: £{value.capitalRaised}
                                  </Typography>

                                  <Typography
                                    className={classes.p1}
                                    style={{ marginTop: "3%" }}
                                  >
                                    Amount needed: £{value.capitalNeeded}
                                  </Typography>
                                </div>
                                <Typography
                                  className={classes.p1}
                                  style={{ marginTop: "3%", fontSize: "0.9em" }}
                                >
                                  Industry: {value.industry}
                                  {""}
                                  {value.industry && value.industry2
                                    ? ","
                                    : ""}{" "}
                                  {value.industry2}
                                </Typography>
                              </CardContent>

                              <CardActions
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <NormalButton
                                  size="small"
                                  className={classes.button}
                                  style={{ marginTop: "3%" }}
                                  onClick={() => {
                                    history.push(
                                      `/dashboard/pitch/${value.id}`
                                    );
                                  }}
                                >
                                  <Typography style={{ color: "white" }}>
                                    More Info
                                  </Typography>
                                </NormalButton>
                                <NormalButton
                                  size="small"
                                  className={classes.button}
                                  style={{
                                    marginTop: "3%",
                                    backgroundColor: "#f44336",
                                  }}
                                  onClick={() => {
                                    deletePitch(value.id);
                                  }}
                                >
                                  <Typography style={{ color: "white" }}>
                                    Delete
                                  </Typography>
                                </NormalButton>
                              </CardActions>
                            </Card>
                          </Paper>
                          {/* Pitch card ends here */}
                        </Grid>
                      );
                    })}
                    {/* List of user's pitches ends here */}
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </div>
        </AuthContext.Provider>
      );
    }
  } else {
    return <div></div>;
  }
};

export default MyPitches;
