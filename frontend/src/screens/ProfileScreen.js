import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PublicIcon from "@mui/icons-material/Public";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./../components/TabPanel";
import Experience from "../components/Experience";
import Education from "./../components/Education";
import Certification from "./../components/Certification";
import AwardsAndAchievements from "./../components/AwardsAndAchievements";
import Projects from "../components/Projects";
import ArticleCard from "../components/Articles";
import ComingSoon from "./../components/ComingSoon";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileDetails } from "../actions/userActions";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import EmailIcon from "@mui/icons-material/Email";
import SvgIcon from "@mui/material/SvgIcon";

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

function ProfileScreen({
  history,
  match: {
    params: { username },
  },
}) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.profile.userProfile);

  const { loading, error, profile } = userProfile;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleEditProfile = () => {
    history.push("/editprofile");
  };
  useEffect(() => {
    dispatch(getUserProfileDetails(username));
  }, [dispatch, history, username]);
  return (
    <div style={{ margin: "3em 2em" }}>
      <Loader loading={loading} />
      {error && <Message variant="error">{error}</Message>}
      {profile && (
        <>
          <Grid container spacing={3} className={classes.intro}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt={profile.name + "`s Profile Image"}
                src={profile.photo}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={6} className={classes.info}>
              <Typography variant="h4" component="span">
                {profile.name}
              </Typography>
              <br />
              <Typography variant="subtitle1" component="span">
                {profile.tagLine}
              </Typography>
              <br />
              <Typography variant="body1" component="span">
                {profile.bio}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} style={{ textAlign: "end" }}>
              {userInfo && userInfo.username === profile.username && (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{
                      width: {
                        xs: "100%",
                        md: "auto",
                      },
                    }}
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                  <br />
                  <br />
                </>
              )}
              {profile.location && (
                <>
                  <div className={classes.location}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="caption" component="span">
                      {profile.location}
                    </Typography>
                  </div>
                  <br />
                </>
              )}
              <div className={classes.socialIcons}>
                <a
                  className={classes.link}
                  href={`mailto:${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EmailIcon fontSize="small" />
                </a>
                {profile.socialLinks && (
                  <>
                    {Object.keys(profile.socialLinks).map((key) =>
                      socialButton(key, profile.socialLinks[key], classes)
                    )}
                  </>
                )}
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
              {profile.toolsAndTech.length > 0
                ? profile.toolsAndTech.map((val) => (
                    <Chip label={val} key={val} style={{ margin: "3px 2px" }} />
                  ))
                : "No Information Available"}
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
                {profile.languages.length > 0
                  ? profile.languages.map((language) => (
                      <Typography
                        key={language}
                        variant="body2"
                        style={{ margin: "2px" }}
                      >
                        &bull; {language}&nbsp;{" "}
                      </Typography>
                    ))
                  : "No Information Available"}
              </div>
            </CardContent>
          </Card>
          <Paper style={{ margin: "1em 0" }} elevation={2}>
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
              <Experience experiences={profile.experience} />
              <Education educationList={profile.education} />
              <Certification certifications={profile.certifications} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AwardsAndAchievements achievements={profile.achievements} />
              <Projects projects={profile.projects} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* <ComingSoon /> */}
              <p style={{ marginLeft: "1em" }}>
                Coming Soon with more exciting features
              </p>
              {/* <ArticleCard rss="https://blog.veereshr.me/rss.xml" /> */}
            </TabPanel>
          </Paper>
        </>
      )}
    </div>
  );
}

export default ProfileScreen;

function socialButton(socialIconName, url, classes) {
  return (
    <>
      {(() => {
        switch (socialIconName) {
          case "linkedIn":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon fontSize="small" />
              </a>
            );
          case "twitter":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon fontSize="small" />
              </a>
            );
          case "github":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon fontSize="small" />
              </a>
            );
          case "medium":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon fontSize="small" aria-label={socialIconName}>
                  <svg
                    viewBox="0 0 1633.77 1150.51"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m883.45 576.26c0 163.67-131.78 296.35-294.33 296.35s-294.34-132.68-294.34-296.35 131.78-296.36 294.34-296.36 294.33 132.69 294.33 296.36" />
                    <path d="m1206.34 576.26c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279" />
                    <path d="m1338.41 576.26c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                    <path
                      d="m1633.77 0h-296.29v.25h-1041.19v-.25h-296.29v1150.07h119.51v.44h1410.41v-.44h103.85zm-296.29 296.54v557.67h-1041.19v-557.67z"
                      fill="none"
                    />
                  </svg>
                </SvgIcon>
              </a>
            );
          case "devTo":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon fontSize="small" aria-label={socialIconName}>
                  <svg
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#000000"
                      d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"
                    ></path>
                  </svg>
                </SvgIcon>
              </a>
            );
          case "hashnode":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon fontSize="small" aria-label={socialIconName}>
                  <svg viewBox="0 0 337 337" fill="none">
                    <rect
                      x="113"
                      y="113"
                      width="111"
                      height="111"
                      rx="55.5"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.155 112.598c-30.873 30.874-30.873 80.93 0 111.804l89.443 89.443c30.874 30.873 80.93 30.873 111.804 0l89.443-89.443c30.873-30.874 30.873-80.93 0-111.804l-89.443-89.443c-30.874-30.873-80.93-30.873-111.804 0l-89.443 89.443zm184.476 95.033c21.612-21.611 21.612-56.651 0-78.262-21.611-21.612-56.651-21.612-78.262 0-21.612 21.611-21.612 56.651 0 78.262 21.611 21.612 56.651 21.612 78.262 0z"
                      fill="black"
                    />
                  </svg>
                </SvgIcon>
              </a>
            );
          case "leetCode":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon fontSize="small" aria-label={socialIconName}>
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>LeetCode</title>
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </SvgIcon>
              </a>
            );
          case "hackerRank":
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgIcon fontSize="small" aria-label={socialIconName}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-1 -1 582 486.999"
                  >
                    <path d="M-1-1h582v402H-1z" fill="none" />
                    <path
                      d="M454.843 141.001c-13.019-22.417-172.832-115-198.859-115-26.019 0-185.895 92.351-198.84 115-12.947 22.649-13.019 207.358 0 230.009 13.018 22.639 172.839 114.989 198.84 114.989 26 0 185.841-92.466 198.851-114.999 13.007-22.533 13.016-207.583.008-229.999zM309.862 398.15c-3.559 0-36.756-32.137-34.141-34.762.781-.78 5.625-1.328 15.768-1.644 0-23.564.53-61.622.844-77.553.038-1.814-.395-3.081-.395-5.256h-71.812c0 6.379-.412 32.523 1.232 65.479.205 4.078-1.42 5.353-5.158 5.335-9.102-.025-18.211-.099-27.321-.071-3.683.009-5.274-1.374-5.157-5.488.826-30.043 2.66-75.488-.134-191.07v-2.849c-8.688-.314-14.717-.862-15.508-1.652-2.624-2.624 31.032-34.76 34.581-34.76 3.558 0 36.989 32.145 34.383 34.76-.782.781-7.098 1.338-15.067 1.652v2.84c-2.174 23.135-1.823 71.506-2.362 94.686h72.107c0-4.089.351-31.212-1.077-75.145-.091-3.047.853-4.646 3.781-4.672 9.945-.072 19.9-.117 29.855-.055 3.108.019 4.105 1.546 4.043 4.834-3.28 171.861-.594 159.867-.594 188.975 7.97.315 15.112.864 15.895 1.655 2.588 2.615-30.205 34.761-33.763 34.761z"
                      fill="#2ec866"
                    />
                  </svg>
                </SvgIcon>
              </a>
            );
          default:
            return (
              <a
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PublicIcon fontSize="small" />
              </a>
            );
        }
      })()}
    </>
  );
}
