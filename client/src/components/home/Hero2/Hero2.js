import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@material-ui/core";
import useStyles from "./Hero2Style"; // Component Styles
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
          style={{ minHeight: "32vh" }}
        >
          <Grid item lg={6} md={10} sm={10} xs={12}>
            <Box textAlign="center">
              <h1 className={classes.h1}>
                Begin your investment adventure today!
              </h1>
            </Box>
          </Grid>
          <Grid item lg={12} md={10} sm={10} xs={12}>
            <Box textAlign="center">
              <h2 className={classes.h2}>
                Whether you are looking for investment or looking to invest.
                FundX has what you need.
              </h2>
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
                    Find out more!
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
                    View Pitches
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

export default Hero;
