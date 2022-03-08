import React from "react";
import "./Landing.css";
import img1 from "../assets/team_maker1.svg";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";

function LandingScreen() {
  return (
    <>
      <section class="blue">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <h1>Team Maker</h1>
            <Typography
              gutterBottom
              variant="h4"
              sx={{ mr: 2, my: 4, mx: 4, display: { xs: "", md: "flex" } }}
            >
              {" "}
              Find a team for your next big project !{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ my: 8 }}>
            <img alt="header" src={img1} width="90%"></img>
          </Grid>
        </Grid>
        <div class="curve"></div>
      </section>

      <Box sx={{ boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5} sx={{ my: 8 }} zIndex="2">
            <img src={img1} alt="landing-1" width="90%" />
          </Grid>

          <Grid item xs={12} lg={2}></Grid>

          <Grid item xs={12} lg={5}>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{
                mr: 2,
                my: { lg: 20, xs: 2 },
                mx: 4,
                display: { md: "flex" },
              }}
            >
              {" "}
              Explore new oppportunities.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{
                mr: 2,
                my: { lg: 20, xs: 2 },
                mx: 4,
                display: { xs: "", md: "flex" },
              }}
            >
              {" "}
              Schedule a video call with your mentor.{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={2}></Grid>
          <Grid item xs={12} lg={5} sx={{ my: { lg: 8, xs: 2 } }}>
            <img src={img1} alt="landing-1" width="90%" />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: "#eeeeee", boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5} sx={{ my: 8 }}>
            <img src={img1} alt="landing-1" width="90%" />
          </Grid>

          <Grid item xs={12} lg={2}></Grid>

          <Grid item xs={12} lg={5}>
            <Typography
              gutterBottom
              variant="h4"
              color="textSecondary"
              sx={{
                mr: 2,
                my: { lg: 20, xs: 2 },
                mx: 4,
                display: { md: "flex" },
              }}
            >
              {" "}
              Explore new oppportunities.{" "}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LandingScreen;
