import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./../components/TabPanel";
import EditEducation from "./../components/EditEducation";
import EditExperience from "./../components/EditExperience";
import EditCertification from "./../components/EditCertification";
import EditAwardsAndAchievements from "./../components/EditAwardsAndAchievements";
import EditProjects from "./../components/EditProjects";
import ComingSoon from "./../components/ComingSoon";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasicInformation,
  updateBasicInformation,
} from "./../actions/userActions";
import Message from "./../components/Message";

export default function EditProfile({ history }) {
  const [value, setValue] = React.useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ margin: "3em 2em" }}>
      {error && <Message variant="error">{error}</Message>}
      <BasicInformation id={userInfo?._id} />
      <Skills id={userInfo?._id} />
      <Languages id={userInfo?._id} />
      <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
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
          <EditEducation id={userInfo?._id} />
          <EditExperience id={userInfo?._id} />
          <EditCertification id={userInfo?._id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditAwardsAndAchievements id={userInfo?._id} />
          <EditProjects id={userInfo?._id} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <ComingSoon /> */}
          <p style={{ marginLeft: "1em" }}>
            Coming Soon with more exciting features
          </p>
          {/* <ArticleCard rss="https://blog.veereshr.me/rss.xml" /> */}
        </TabPanel>
      </Paper>
    </div>
  );
}

function BasicInformation({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.basicInformation);
  const { error, basicInformation } = data;

  const updatedData = useSelector((state) => state.updateBasicInformation);
  const updateSuccess = updatedData.success;
  const updateError = updatedData.error;

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [medium, setMedium] = useState("");
  const [devTo, setDevTo] = useState("");
  const [hashnode, setHashnode] = useState("");
  const [leetCode, setLeetCode] = useState("");
  const [hackerRank, setHackerRank] = useState("");
  const [other, setOther] = useState("");
  useEffect(() => {
    if (basicInformation) {
      setName(basicInformation?.name);
      setPhoto(basicInformation?.photo);
      setTagLine(basicInformation?.tagLine);
      setBio(basicInformation?.bio);
      setLocation(basicInformation?.location);
      setLinkedIn(basicInformation?.socialLinks?.linkedIn);
      setTwitter(basicInformation?.socialLinks?.twitter);
      setGithub(basicInformation?.socialLinks?.github);
      setMedium(basicInformation?.socialLinks?.medium);
      setDevTo(basicInformation?.socialLinks?.devTo);
      setHashnode(basicInformation?.socialLinks?.hashnode);
      setLeetCode(basicInformation?.socialLinks?.leetCode);
      setHackerRank(basicInformation?.socialLinks?.hackerRank);
      setOther(basicInformation?.socialLinks?.other);
    } else {
      dispatch(getBasicInformation(id));
    }
  }, [basicInformation, dispatch, id]);
  const handleSaveChanges = () => {
    const toUpdateData = {
      name,
      photo,
      tagLine,
      bio,
      location,
      socialLinks: {
        linkedIn,
        twitter,
        github,
        medium,
        devTo,
        hashnode,
        leetCode,
        hackerRank,
        other,
      },
    };
    dispatch(updateBasicInformation(toUpdateData));
  };

  return (
    <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
      {error && <Message variant="error">{error}</Message>}
      {updateError && <Message variant="error">{updateError}</Message>}
      {updateSuccess && (
        <Message variant="success">{"Profile Updated Successfully"}</Message>
      )}
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ margin: "0.5em 0" }}
      >
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Avatar
            key={Math.random().toString(36)}
            alt={photo}
            src={photo}
            sx={{
              width: {
                xs: "150px",
                md: "200px",
              },
              height: {
                xs: "150px",
                md: "200px",
              },
              margin: "auto",
            }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            label="Image Url"
            fullWidth
            sx={{ margin: "0.5em 0" }}
            value={photo}
            onChange={(newValue) => setPhoto(newValue.target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            label="Full Name"
            fullWidth
            sx={{ margin: "0.5em 0" }}
            value={name}
            onChange={(newValue) => setName(newValue.target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            label="Tagline"
            fullWidth
            sx={{ margin: "0.5em 0" }}
            value={tagLine}
            onChange={(newValue) => setTagLine(newValue.target.value)}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            id="outlined-multiline-flexible"
            label="Bio"
            multiline
            rows={5}
            fullWidth
            value={bio}
            onChange={(newValue) => setBio(newValue.target.value)}
            sx={{ margin: "0.5em 0" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            required
            label="Location"
            fullWidth
            sx={{ margin: "0.5em 0" }}
            value={location}
            onChange={(newValue) => setLocation(newValue.target.value)}
          />
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ margin: "0.5em 0" }}
          >
            Social
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                InputLabelProps={{ shrink: true }}
                label="LinkedIn Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={linkedIn}
                onChange={(newValue) => setLinkedIn(newValue.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Twitter Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={twitter}
                onChange={(newValue) => setTwitter(newValue.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Github Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={github}
                onChange={(newValue) => setGithub(newValue.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Medium Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={medium}
                onChange={(newValue) => setMedium(newValue.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {" "}
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Dev.to Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={devTo}
                onChange={(newValue) => setDevTo(newValue.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Hashnode Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={hashnode}
                onChange={(newValue) => setHashnode(newValue.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="leetCode Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={leetCode}
                onChange={(newValue) => setLeetCode(newValue.target.value)}
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="HackerRank Profile Url"
                fullWidth
                sx={{ margin: "0.5em 0" }}
                value={hackerRank}
                onChange={(newValue) => setHackerRank(newValue.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Other Url"
            fullWidth
            sx={{ margin: "0.5em 0" }}
            value={other}
            onChange={(newValue) => setOther(newValue.target.value)}
          />

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            fullWidth
            onClick={handleSaveChanges}
            sx={{
              marginTop: {
                md: "3em",
              },
            }}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

function Languages() {
  return (
    <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ margin: "0.5em 0" }}
      >
        Languages
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "150px",
          border: "1px solid rgb(218 218 218)",
          borderRadius: "4px",
        }}
      ></Box>
      <TextField
        label="Add Languages"
        fullWidth
        sx={{ margin: "0.5em 0" }}
        helperText="Please enter the spoken language and press enter"
      />
      <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
        Save Changes
      </Button>
    </Paper>
  );
}

function Skills() {
  return (
    <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ margin: "0.5em 0" }}
      >
        Skills
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "150px",
          border: "1px solid rgb(218 218 218)",
          borderRadius: "4px",
        }}
      ></Box>
      <TextField
        label="Add Skills"
        fullWidth
        sx={{ margin: "0.5em 0" }}
        helperText="Please enter the skill and press enter"
      />
      <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
        Save Changes
      </Button>
    </Paper>
  );
}
