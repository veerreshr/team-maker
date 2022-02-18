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
  getLanguages,
  getSkills,
  updateBasicInformation,
  updateLanguages,
  updateSkills,
} from "./../actions/userActions";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProfile({ history }) {
  const [value, setValue] = React.useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
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
      <Loader loading={loading} />
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
  const data = useSelector((state) => state.profile.basicInformation);
  const { loading, error, basicInformation } = data;

  const updatedData = useSelector(
    (state) => state.profile.updateBasicInformation
  );
  const updateSuccess = updatedData.success;
  const updateError = updatedData.error;
  const updateLoading = updatedData.loading;

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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setPhoto(data?.photoURL);
      // setPhoto(data);
    } catch (error) {
      toast.error("Error uploading Image");
      console.error(error);
    }
  };

  return (
    <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
      <Loader loading={loading || updateLoading} />
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
          <label htmlFor="contained-button-file">
            <input
              accept="image/png, image/jpg, image/jpeg"
              id="contained-button-file"
              style={{ display: "none" }}
              onChange={uploadFileHandler}
              type="file"
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
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

function Skills({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.skills);
  const { loading, error, skills, updateSuccess } = data;
  const [skillList, setSkillList] = useState([]);
  useEffect(() => {
    if (skills) {
      setSkillList(skills);
    } else {
      dispatch(getSkills(id));
    }
  }, [dispatch, id, skills]);

  const handleSubmit = () => {
    dispatch(updateSkills({ toolsAndTech: skillList }));
  };
  return (
    <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
      <Loader loading={loading} />
      {error && <Message variant="error">{error}</Message>}
      {updateSuccess && (
        <Message variant="success">{"Skills Updated Successfully"}</Message>
      )}
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
      >
        {" "}
        {skillList?.map((s) => (
          <Chip label={s} sx={{ margin: 0.5 }} />
        ))}
      </Box>
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Add Skills"
        fullWidth
        sx={{ margin: "0.5em 0" }}
        value={skillList.join()}
        onChange={(newValue) => setSkillList(newValue.target.value.split(","))}
        helperText="Please enter comma separated skills. Ex: HTML,CSS,JS"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        startIcon={<SaveIcon />}
        fullWidth
      >
        Save Changes
      </Button>
    </Paper>
  );
}
function Languages({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.languages);
  const { loading, error, languages, updateSuccess } = data;
  const [languageList, setLanguageList] = useState([]);
  useEffect(() => {
    if (languages) {
      setLanguageList(languages);
    } else {
      dispatch(getLanguages(id));
    }
  }, [dispatch, id, languages]);

  const handleSubmit = () => {
    dispatch(updateLanguages({ languages: languageList }));
  };
  return (
    <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
      <Loader loading={loading} />
      {error && <Message variant="error">{error}</Message>}
      {updateSuccess && (
        <Message variant="success">{"Languages Updated Successfully"}</Message>
      )}
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
      >
        {" "}
        {languageList?.map((s) => (
          <Chip label={s} sx={{ margin: 0.5 }} />
        ))}
      </Box>
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Add Languages"
        fullWidth
        sx={{ margin: "0.5em 0" }}
        value={languageList.join()}
        onChange={(newValue) =>
          setLanguageList(newValue.target.value.split(","))
        }
        helperText="Please enter comma separated languages. Ex: English,Hindi"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        startIcon={<SaveIcon />}
        fullWidth
      >
        Save Changes
      </Button>
    </Paper>
  );
}
