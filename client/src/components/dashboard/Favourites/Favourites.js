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
  IconButton,
  CardMedia,
  CardActions,
  Button as NormalButton,
} from "@material-ui/core";
import axios from "axios";
import Location from "@material-ui/icons/LocationOn";
import cardImage from "../../../images/dashboard/placeholder.png";
import Favorite from "@material-ui/icons/Favorite";
import userIcon from "../../../images/dashboard/usericon.png";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../../helpers/AuthContext";
import useStyles from "./FavouritesStyle"; // Component Styles

const Favourites = () => {
  let history = useHistory();
  const classes = useStyles();
  const [favouritedPitches, setFavouritedPitches] = useState([]);
  const [isSet, setIsSet] = useState(false);

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  // Get User Favourites
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/favourite/userfavourites",
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      // Set Favourites Pitches to response data of GET
      setFavouritedPitches(response.data);
      setIsSet(true);
    });
    // Access Token Check
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  // Favourite Pitch
  const favouritePitch = (pitchId) => {
    axios({
      method: "post",
      url: "http://localhost:3001/favourite",
      data: {
        PitchId: pitchId,
      },
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      if (!response.data.favourited) {
        // Destructure pitch and modify favourites field and adding 0 so the length is modified to favourite the post
        const newListOfFavouritedPitches = favouritedPitches.filter(function (
          el
        ) {
          return el.PitchId !== pitchId;
        });
        setFavouritedPitches([...newListOfFavouritedPitches]);
      }
    });
  };

  if (isSet) {
    // If No favourites for user then return -
    if (favouritedPitches.length === 0) {
      return (
        <div className={classes.root}>
          {" "}
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
                  You have no favourited pitches
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      // If the user has favourites then return -
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
                    Your Favourites
                  </Typography>
                  <Grid container spacing={3}>
                    {/* List of user's favourites starts here */}
                    {favouritedPitches.map((value, key) => {
                      return (
                        <Grid item xs={12} md={4} lg={4}>
                          {/* Pitch card starts here */}
                          <Paper className={classes.paper}>
                            <Card className={classes.card}>
                              <CardContent>
                                <CardHeader
                                  avatar={
                                    <Link to={`profile/${value.Pitch.UserId}`}>
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
                                  title={value.Pitch.pitchTitle}
                                  subheader={
                                    <Badge className={classes.badge}>
                                      {value.Pitch.location},{" "}
                                      {value.Pitch.country}
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
                                  {value.Pitch.pitchInfo.length > 100
                                    ? `${value.Pitch.pitchInfo.substring(
                                        0,
                                        100
                                      )}...`
                                    : value.Pitch.pitchInfo}
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
                                    Amount raised: £{value.Pitch.capitalRaised}
                                  </Typography>

                                  <Typography
                                    className={classes.p1}
                                    style={{ marginTop: "3%" }}
                                  >
                                    Amount needed: £{value.Pitch.capitalNeeded}
                                  </Typography>
                                </div>
                                <Typography
                                  className={classes.p1}
                                  style={{ marginTop: "3%", fontSize: "0.9em" }}
                                >
                                  Industry: {value.Pitch.industry}
                                  {""}
                                  {value.Pitch.industry && value.Pitch.industry2
                                    ? ","
                                    : ""}{" "}
                                  {value.Pitch.industry2}
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
                                      `/dashboard/pitch/${value.Pitch.id}`
                                    );
                                  }}
                                >
                                  <Typography style={{ color: "white" }}>
                                    More Info
                                  </Typography>
                                </NormalButton>

                                <IconButton
                                  aria-label="add to favorites"
                                  onClick={() => {
                                    favouritePitch(value.Pitch.id);
                                  }}
                                >
                                  <Favorite
                                    style={{
                                      color: favouritedPitches.includes(
                                        value.Pitch.id
                                      )
                                        ? "#f44336"
                                        : "#f44336",
                                    }}
                                    className={
                                      favouritedPitches.includes(value.Pitch.id)
                                        ? "unfavouriteButton"
                                        : "FavouriteButton"
                                    }
                                  />
                                  <Typography
                                    className={classes.h1}
                                    style={{}}
                                  ></Typography>
                                </IconButton>
                              </CardActions>
                            </Card>
                          </Paper>
                          {/* Pitch card ends here */}
                        </Grid>
                      );
                    })}
                    {/* List of user's favourites ends here */}
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

export default Favourites;
