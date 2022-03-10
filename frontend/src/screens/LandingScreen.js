import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ReactComponent as CreativeBlockSVG } from "../assets/landing1.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function LandingScreen({ history }) {
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ maxHeight: "87vh", my: 2, overflow: "hidden" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "87vh",
              display: "flex",
              justifyContent: "center",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
              px: 4,
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "normal",
                fontSize: { xs: "2.5rem", md: "4rem" },
              }}
              gutterBottom
              component="div"
            >
              For Your Next Big Project
            </Typography>
            <Typography variant="body1" gutterBottom>
              A Platform to find and colloborate for your next big project
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
              Get Started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={0} md={6} sx={{ background: "black" }}>
          <CreativeBlockSVG />
        </Grid>
      </Grid>
      <Box sx={{ px: 4, py: 5, background: "#f5f5f5" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "400",
            mb: 4,
          }}
          gutterBottom
          component="div"
        >
          Discover Key Features
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <AccountCircleIcon sx={{ fontSize: 40 }} color="primary" />
            <Typography gutterBottom variant="h5" component="h2">
              User Portfolio
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Showcase your work! User Portfolio lets you add all the relevant
              details required to describe you. Its a simple resume alternative.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <GroupsIcon sx={{ fontSize: 40 }} color="primary" />
            <Typography gutterBottom variant="h5" component="h2">
              Teams &amp; Collaboration
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Easy collaboration and chat with your team members based on the
              events you are interested
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalActivityIcon sx={{ fontSize: 40 }} color="primary" />
            <Typography gutterBottom variant="h5" component="h2">
              Events Discovery
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Discover events happening in your city and find various groups of
              same interest.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 4, py: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src="https://res.cloudinary.com/dcgefz04y/image/upload/v1646937013/protfolio_wzgg1g.png"
              alt="Portfolio"
              style={{ backgroundSize: "cover", height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
              px: 4,
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "400",
              }}
              gutterBottom
              component="div"
            >
              User Portfolio
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your profile is more than just a few words about yourself. It's
              who you are, what you do and how you do it. It describes your
              skills, passions and experiences. This helps other users get to
              know you better. Provide the necessary details and watch it
              transform into an elegant CV.
            </Typography>
            <Link to="/login">Know More &rarr;</Link>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 4, py: 5 }}>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
              px: 4,
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "400",
                // mb: 4,
              }}
              gutterBottom
              component="div"
            >
              Teams &amp; Collaboration
            </Typography>
            <Typography variant="body1" gutterBottom>
              Teams and Collaboration is a tool to collaborate with your team
              members. It provides a common platform for various activities like
              chatting, sharing ideas, give reviews and feedbacks etc. Users can
              create chat groups to interact with other like minded users of the
              platform. You can stay connected with your team all the time and
              monitor the status of events you are interested in.
            </Typography>
            <Link to="/login">Know More &rarr;</Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://res.cloudinary.com/dcgefz04y/image/upload/v1646938620/teams_o8rwsy.png"
              alt="Teams and Collaboration"
              style={{ backgroundSize: "cover", height: "100%", width: "100%" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 4, py: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src="https://res.cloudinary.com/dcgefz04y/image/upload/v1646940004/events_urc5k0.png"
              alt="Events Discovery"
              style={{ backgroundSize: "cover", height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: {
                xs: "center",
                md: "flex-start",
              },
              textAlign: {
                xs: "center",
                md: "left",
              },
              px: 4,
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "400",
                // mb: 4,
              }}
              gutterBottom
              component="div"
            >
              Events Discovery
            </Typography>
            <Typography variant="body1" gutterBottom>
              This is an excellent way to discover various events in the cities.
              You can create a team according to the event and join any existing
              team as well. We also have featured events section to help users
              to view the most popular events at one place!
            </Typography>
            <Link to="/login">Know More &rarr;</Link>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          backgroundColor: "#313131",
          flexDirection: "column",
          pt: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "400",
            color: "white",
          }}
          gutterBottom
          component="div"
        >
          Come, Lets build your Team
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        &copy; {new Date().getFullYear()} Team Maker. All rights reserved.
      </Box>
    </Box>
  );
}

export default LandingScreen;
