import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  withStyles,
  IconButton,
  Box,
  Avatar,
  Grid,
  Container,
  Hidden,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
// Icons
import Home from "@material-ui/icons/Home";
import Note from "@material-ui/icons/Note";
import Create from "@material-ui/icons/Create";
import Favorite from "@material-ui/icons/Favorite";
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import MyPitchesLogo from "@material-ui/icons/HowToReg";

import { Route, useHistory, Switch } from "react-router-dom";
import LogoNav from "../../../images/dashboard/LogoNav.png";
import useStyles from "./DashboardStyle"; // Component Styles
// Components
import Pitches from "../Pitches/Pitches";
import AllPitches from "../AllPitches/AllPitches";
import ChangePassword from "../ChangePassword/ChangePassword";
import CreatePitch from "../CreatePitch/CreatePitch";
import Favourites from "../Favourites/Favourites";
import AdminPanel from "../AdminPanel/AdminPanel";
import EditProfile from "../Profile/EditProfile";
import userIcon from "../../../images/dashboard/usericon.png";
import Profile from "../Profile/Profile";
import SinglePitch from "../SinglePitch/SinglePitch";
import PageNotFound from "../PageNotFound/PageNotFound";
import MyPitches from "../MyPitches/MyPitches";

import { AuthContext } from "../../../helpers/AuthContext";
import axios from "axios";

function Dashboard(props) {
  const history = useHistory();
  const classes = useStyles();

  const [authState, setAuthState] = useState({
    displayName: "",
    id: 0,
    status: false,
  });

  // Set Auth State
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/auth/auth",
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      if (response.data.error) {
        // If no access token then return auth state to false
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          displayName: response.data.displayName,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const LogoButton = withStyles(() => ({
    root: {
      "&:hover": {},
    },
  }))(IconButton);

  // Logout
  const logout = () => {
    // remove access token
    localStorage.removeItem("accessToken");
    // clear auth state
    setAuthState({
      displayName: "",
      id: 0,
      status: false,
    });
    // redirec to homepage
    history.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <AppBar position="static" elevation="0">
          <Toolbar className={classes.toolbar}>
            <Box display="flex" m={1}>
              <LogoButton
                onClick={() => {
                  history.push("/");
                }}
                style={{ backgroundColor: "transparent" }}
              >
                <img src={LogoNav} alt="" width="130px" height="35px" />
              </LogoButton>
            </Box>
            {authState.status && (
              <>
                <Box className={classes.icons} onClick={handleClick}>
                  <Typography
                    style={{ fontWeight: "700", paddingRight: "5px" }}
                  >
                    {authState.displayName}
                  </Typography>
                  <Box className={classes.containerItem}>
                    {/* NavBar Menu Starts Here */}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          history.push("/dashboard/editprofile");
                          handleClose();
                        }}
                      >
                        Edit Profile
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          logout();
                          handleClose();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                    {/* NavBar Menu Ends Here */}
                  </Box>
                  <Avatar>
                    <img
                      src={userIcon}
                      alt=""
                      width="50px"
                      height="35px"
                      onClick={handleClick}
                    />
                  </Avatar>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
        {/* SideBar Nav Starts Here */}
        <Grid container>
          <Grid item xs={2}>
            <Container className={classes.container}>
              <Box className={classes.containerItem}>
                <Home
                  className={classes.icon}
                  onClick={() => history.push("/dashboard/pitches")}
                />
                <Hidden smDown>
                  <Typography
                    className={classes.h1}
                    style={{ paddingLeft: "2%" }}
                    onClick={() => history.push("/dashboard/pitches")}
                  >
                    Pitches
                  </Typography>
                </Hidden>
              </Box>
              <Box className={classes.containerItem}>
                <Note
                  className={classes.icon}
                  onClick={() => history.push("/dashboard/allpitches")}
                />
                <Hidden smDown>
                  <Typography
                    className={classes.h1}
                    style={{ paddingLeft: "2%" }}
                    onClick={() => history.push("/dashboard/allpitches")}
                  >
                    View All Pitches
                  </Typography>
                </Hidden>
              </Box>
              {/* Only Show if Logged in Link Start Here */}
              {authState.status && (
                <>
                  <Box className={classes.containerItem}>
                    <Create
                      className={classes.icon}
                      onClick={() => history.push("/dashboard/createPitch")}
                    />
                    <Hidden smDown>
                      <Typography
                        className={classes.h1}
                        style={{ paddingLeft: "2%" }}
                        onClick={() => history.push("/dashboard/createPitch")}
                      >
                        Create Pitch
                      </Typography>
                    </Hidden>
                  </Box>
                  <Box className={classes.containerItem}>
                    <MyPitchesLogo
                      className={classes.icon}
                      onClick={() => history.push("/dashboard/mypitches")}
                    />
                    <Hidden smDown>
                      <Typography
                        className={classes.h1}
                        style={{ paddingLeft: "2%" }}
                        onClick={() => history.push("/dashboard/mypitches")}
                      >
                        My Pitches
                      </Typography>
                    </Hidden>
                  </Box>
                  <Box className={classes.containerItem}>
                    <Favorite
                      className={classes.icon}
                      onClick={() => history.push("/dashboard/favourites")}
                    />
                    <Hidden smDown>
                      <Typography
                        className={classes.h1}
                        style={{ paddingLeft: "2%" }}
                        onClick={() => history.push("/dashboard/favourites")}
                      >
                        Favourites
                      </Typography>
                    </Hidden>
                  </Box>

                  <Box className={classes.containerItem}>
                    <Person
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Hidden smDown>
                      <Typography
                        className={classes.h1}
                        style={{ paddingLeft: "2%" }}
                        onClick={handleClick}
                      >
                        Edit Profile
                      </Typography>
                    </Hidden>

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          history.push("/dashboard/editprofile");
                          handleClose();
                        }}
                      >
                        Edit Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          history.push("/dashboard/changepassword");
                          handleClose();
                        }}
                      >
                        Change Password
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Box className={classes.containerItem}>
                    <ExitToApp className={classes.icon} onClick={logout} />
                    <Hidden smDown>
                      <Typography
                        className={classes.h1}
                        style={{ paddingLeft: "2%" }}
                        onClick={logout}
                      >
                        Logout
                      </Typography>
                    </Hidden>
                  </Box>
                </>
              )}
              {/* Only Show if Logged in Link End Here */}

              {/* Only Show if Not Logged In Links Start Here */}
              {!authState.status && (
                <>
                  <Box className={classes.containerItem}>
                    <ExitToApp
                      className={classes.icon}
                      onClick={() => history.push("/login")}
                    />
                    <Hidden smDown>
                      <Typography
                        className={classes.h1}
                        onClick={() => history.push("/login")}
                      >
                        Login
                      </Typography>
                    </Hidden>
                  </Box>
                </>
              )}
              {/* Only Show if Not Logged In Links End Here */}
            </Container>
          </Grid>
          <Grid container item xs={10}>
            {/* Routes Start Here */}
            <Switch>
              <Route path="/dashboard/pitches" exact component={Pitches} />
              <Route
                path="/dashboard/allpitches"
                exact
                component={AllPitches}
              />
              <Route
                path="/dashboard/createpitch"
                exact
                component={CreatePitch}
              />
              <Route
                path="/dashboard/pitch/:id"
                exact
                component={SinglePitch}
              />

              <Route
                path="/dashboard/favourites"
                exact
                component={Favourites}
              />

              <Route path="/dashboard/profile/:id" exact component={Profile} />

              <Route
                path="/dashboard/editprofile"
                exact
                component={EditProfile}
              />

              <Route
                path="/dashboard/changepassword"
                exact
                component={ChangePassword}
              />

              <Route path="/dashboard/mypitches" exact component={MyPitches} />

              <Route
                path="/dashboard/adminpanel"
                exact
                component={AdminPanel}
              />
              <Route path="*" exact component={PageNotFound} />
            </Switch>
            {/* Routes End Here */}
          </Grid>
        </Grid>
        {/* SideBar Nav Ends Here */}
      </AuthContext.Provider>
    </div>
  );
}

export default Dashboard;
