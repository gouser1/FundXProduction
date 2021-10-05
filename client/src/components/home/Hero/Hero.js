import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useStyles from "./HeroStyle"; // Component Styles
import { AuthContext } from "../../../helpers/AuthContext";

function Hero(props) {
  const { history } = props;
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  const classes = useStyles();

  const [authState, setAuthState] = useState(false);

  // Access Token Check
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/auth/auth",
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      // If no access token set Auth state to false
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, []);

  return (
    // Auth state check
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item lg={6} md={10} sm={10} xs={12}>
            <Box textAlign="center" pt={10}>
              <Typography className={classes.h1}>
                Providing Unique Value to Entrepreneurs and Investors
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={10} sm={10} xs={12}>
            <Box textAlign="center">
              <Typography className={classes.h2}>
                We are an Angel-led Investment platform that connects high
                growth potentional companies with experienced investors.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {/* Show register button if user not logged in */}
            {!authState && (
              <>
                <Box textAlign="center" pt={2}>
                  <Button
                    onClick={() => handleButtonClick("/register")}
                    className={classes.button}
                  >
                    Get Started <ArrowForwardIcon />
                  </Button>
                </Box>
              </>
            )}
            {/* Show pitches button if user logged in */}
            {authState && (
              <>
                <Box textAlign="center" pt={2}>
                  <Button
                    onClick={() => handleButtonClick("/dashboard/pitches")}
                    className={classes.button}
                  >
                    My Dashboard <ArrowForwardIcon />
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </AuthContext.Provider>
  );
}

export default withRouter(Hero);
