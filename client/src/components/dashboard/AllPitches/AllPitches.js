import React from "react";
import {
  IconButton,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  CardActions,
  Badge,
  Grid,
  Typography,
  Paper,
  Container,
  Button as NormalButton,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Favorite from "@material-ui/icons/Favorite";
import Location from "@material-ui/icons/LocationOn";
import industries from "../../../data/industries.json"; // Form data fields
import countries from "../../../data/countriesFilter.json";
import cardImage from "../../../images/dashboard/placeholder.png";
import userIcon from "../../../images/dashboard/usericon.png";
import { Formik, Form } from "formik";
import Select from "../../FormsUI/Select/index"; // Form Select
import Button from "../../FormsUI/Button/index"; // Form Submit button
import useStyles from "./AllPitchesStyle"; // Component Styles

const AllPitches = () => {
  const [listOfPitches, setListOfPitches] = useState([]);
  const [favouritedPitches, setFavouritedPitches] = useState([]);
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    getListOfPitches();
  }, []);

  // Get all pitches
  const getListOfPitches = () => {
    axios({
      method: "get",
      url: "http://localhost:3001/pitches",
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setListOfPitches(response.data.pitchList);
    });
  };

  // Get filtered list of pitches
  const getFilteredListOfPitches = (data) => {
    let country = data.country === "All" ? "" : data.country;
    let industry = data.industry;

    axios({
      method: "get",
      // encodeURIComponent used as a querystring parameter
      url: `http://localhost:3001/pitches/?country=${country}&industry=${encodeURIComponent(
        industry
      )}`,
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      // set filtered list response to pitch list
      setListOfPitches(response.data.pitchList);
    });
  };

  // Sort by capital needed in descending order
  const sortByLargestCapitalNeeded = () => {
    let newListOfPitches = listOfPitches.sort(
      (a, b) => b.capitalNeeded - a.capitalNeeded
    );
    setListOfPitches([...newListOfPitches]);
  };

  // Sort  by capital needed in ascending order
  const sortBySmallestCapitalNeeded = () => {
    let newListOfPitches = listOfPitches.sort(
      (a, b) => a.capitalNeeded - b.capitalNeeded
    );
    setListOfPitches([...newListOfPitches]);
  };

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
      setListOfPitches(
        listOfPitches.map((pitch) => {
          if (pitch.id === pitchId) {
            if (response.data.favourited) {
              // Destructure pitch and modify favourites field and adding 0 so the length is modified to favourite the post
              return { ...pitch, Favourites: [...pitch.Favourites, 0] };
            } else {
              // Remove last element from array to update state of favourited post to remove favourite
              const FavouritesArray = pitch.Favourites;
              FavouritesArray.pop();
              return { ...pitch, Favourites: FavouritesArray };
            }
          } else {
            return pitch;
          }
        })
      );
      if (favouritedPitches.includes(pitchId)) {
        setFavouritedPitches(
          favouritedPitches.filter((id) => {
            return id !== pitchId;
          })
        );
      } else {
        setFavouritedPitches([...favouritedPitches, pitchId]);
      }
    });
  };

  // Formik Initial Form State
  const INITIAL_FORM_STATE = {
    country: "",
    industry: "",
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "100vh", maxWidth: "100%" }}
      >
        <Grid item xs={12} style={{ paddingTop: "2%" }}>
          <Container maxWidth="lg">
            <Formik
              initialValues={INITIAL_FORM_STATE}
              onSubmit={(data) => {
                getFilteredListOfPitches(data);
              }}
            >
              <Form>
                <Typography
                  className={classes.h1}
                  style={{ paddingBottom: "5%" }}
                >
                  All Pitches
                </Typography>
                <Typography
                  className={classes.p1}
                  style={{ paddingBottom: "1%" }}
                >
                  Industries
                </Typography>
                <Select name="industry" options={industries}></Select>
                <Typography
                  className={classes.p1}
                  style={{ paddingBottom: "1%", paddingTop: "1%" }}
                >
                  Countries
                </Typography>
                <Select
                  name="country"
                  options={countries}
                  style={{ paddingBottom: "2%" }}
                ></Select>
                <Button className={classes.button}>
                  <Typography className={classes.p1} style={{ color: "white" }}>
                    Go!
                  </Typography>
                </Button>
                <NormalButton
                  className={classes.button}
                  style={{ backgroundColor: "#f44336", marginLeft: "1%" }}
                  onClick={() => {
                    getListOfPitches();
                  }}
                >
                  <Typography style={{ color: "white" }}>Reset</Typography>
                </NormalButton>
              </Form>
            </Formik>
            <Box
              style={{ marginTop: "2%", marginBottom: "5%", display: "flex" }}
            >
              <NormalButton
                style={{ marginRight: "2%" }}
                size="small"
                color="primary"
                variant="outlined"
                className={classes.buttonOutline}
                onClick={() => {
                  sortByLargestCapitalNeeded();
                }}
              >
                Largest Capital Needed
              </NormalButton>
              <NormalButton
                size="small"
                color="primary"
                variant="outlined"
                className={classes.buttonOutline}
                onClick={() => {
                  sortBySmallestCapitalNeeded();
                }}
              >
                Smallest Capital Needed
              </NormalButton>
            </Box>
            {/* List of all pitches displayed here */}
            <Grid container spacing={3}>
              {listOfPitches.map((value, key) => {
                return (
                  <Grid item xs={12} md={4} lg={4}>
                    {/* Pitch Card Start */}
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
                            {value.industry && value.industry2 ? "," : ""}{" "}
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
                              history.push(`/dashboard/pitch/${value.id}`);
                            }}
                          >
                            <Typography style={{ color: "white" }}>
                              More Info
                            </Typography>
                          </NormalButton>

                          <IconButton
                            aria-label="add to favorites"
                            onClick={() => {
                              favouritePitch(value.id);
                            }}
                          >
                            <Favorite
                              style={{
                                color: favouritedPitches.includes(value.id)
                                  ? "#f44336"
                                  : "#f44336",
                              }}
                              className={
                                favouritedPitches.includes(value.id)
                                  ? "unfavouriteButton"
                                  : "FavouriteButton"
                              }
                            />

                            <Typography>{value.Favourites.length}</Typography>
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Paper>
                    {/* Pitch Card End */}
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default AllPitches;
