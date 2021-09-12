import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import PublicIcon from "@material-ui/icons/Public";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./../components/TabPanel";
import Experience from "../components/Experience";
import Education from "./../components/Education";
import Certification from "./../components/Certification";
import AwardsAndAchievements from "./../components/AwardsAndAchievements";
import Projects from "../components/Projects";
import ArticleCard from "../components/Articles";
import ComingSoon from "./../components/ComingSoon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  intro: {
    [theme.breakpoints.up("xs")]: {
      minHeight: "200px",
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "220px",
    },
  },
  avatar: {
    [theme.breakpoints.down("md")]: {
      height: "150px",
      width: "150px",
    },
    [theme.breakpoints.up("md")]: {
      height: "200px",
      width: "200px",
    },
    margin: "auto",
  },
  info: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  location: {
    display: "flex",

    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    margin: "0 2px",
  },
  socialIcons: {
    display: "flex",

    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      display: "none",
    },
  },
}));

function ProfileScreen() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ margin: "3em 2em" }}>
      <Grid container spacing={3} className={classes.intro}>
        <Grid item xs={12} sm={3}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={6} className={classes.info}>
          <Typography variant="h4" component="span">
            Veeresh Raavipaati
          </Typography>
          <br />
          <Typography variant="subtitle1" component="span">
            Software Engineer
          </Typography>
          <br />
          <Typography variant="body1" component="span">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} style={{ textAlign: "end" }}>
          <div className={classes.location}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="caption" component="span">
              Banglore, India
            </Typography>
          </div>
          <br />
          <div className={classes.socialIcons}>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PublicIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon fontSize="small" />
            </a>
            <a
              className={classes.link}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PublicIcon fontSize="small" />
            </a>
          </div>
        </Grid>
      </Grid>
      <Accordion
        defaultExpanded={true}
        style={{ marginTop: "1em" }}
        classes={{
          root: classes.MuiAccordionroot,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Tools and Technologies
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexWrap: "wrap" }}>
          {[
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
            "React",
            "Web",
          ].map((value) => (
            <Chip label={value} style={{ margin: "3px 2px" }} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Card>
        <CardContent>
          <Typography variant="body1">Languages</Typography>
          <div
            style={{
              margin: "1em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {["English", "Telugu", "Kannada", "Hindi"].map((language) => (
              <Typography variant="body2" style={{ margin: "2px" }}>
                &bull; {language}&nbsp;{" "}
              </Typography>
            ))}
          </div>
        </CardContent>
      </Card>
      <Paper style={{ margin: "1em 0" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Background" />
          <Tab label="Accomplishments" />
          <Tab label="Activity" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Experience />
          <Education />
          <Certification />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AwardsAndAchievements />
          <Projects />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ComingSoon />
          <ArticleCard rss="https://blog.veereshr.me/rss.xml" />
        </TabPanel>
      </Paper>
    </div>
  );
}

export default ProfileScreen;
