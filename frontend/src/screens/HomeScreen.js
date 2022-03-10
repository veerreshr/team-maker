import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LinkIcon from "@mui/icons-material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EventsTable from "../components/EventsTable";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getEventsAction } from "./../actions/eventActions";
import Loader from "./../components/Loader";
import Message from "./../components/Message";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function HomeScreen({ history }) {
  const dispatch = useDispatch();

  const eventsData = useSelector((state) => state.eventSection.events);

  const { loading, error, events } = eventsData;

  const matches_md_up = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getEventsAction());
  }, [dispatch]);
  return (
    <Box
      sx={{
        margin: {
          xs: 1,
          md: 2,
        },
      }}
    >
      {matches_md_up ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card
              elevation={3}
              sx={{ px: 2, py: 1, height: "85vh", overflowY: "scroll" }}
            >
              <CardContent>
                <Typography component="h1" variant="h5">
                  Featured Events
                </Typography>
                <Loader loading={loading} />
                {error && <Message variant="error">{error}</Message>}
                {events &&
                  events.map((event) => (
                    <EventCard
                      key={event._id}
                      photo={event.photo}
                      name={event.name}
                      desc={event.desc}
                      startDate={event.startDate}
                      url={event.url}
                    />
                  ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card elevation={3} sx={{ px: 2, py: 1, height: "85vh" }}>
              <CardContent sx={{ height: "100%" }}>
                <Typography component="h1" variant="h5">
                  Other Events
                </Typography>
                <EventsTable />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="event tabs">
              <Tab label="Featured Events" {...a11yProps(0)} />
              <Tab label="Other Events" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Loader loading={loading} />
            {error && <Message variant="error">{error}</Message>}
            {events &&
              events.map((event) => (
                <EventCard
                  key={event._id}
                  photo={event.photo}
                  name={event.name}
                  desc={event.desc}
                  startDate={event.startDate}
                  url={event.url}
                />
              ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EventsTable />
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}

export default HomeScreen;

function EventCard({ name, photo, desc, startDate, url }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(url);
  return (
    <Card sx={{ my: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={photo}
            alt={name}
            sx={{ height: "150px" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              Start Date : {startDate}
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              <Tooltip title="Create Team">
                <IconButton aria-label="Create Team">
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Join Team">
                <IconButton aria-label="Join Team">
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open Website">
                <IconButton
                  aria-label="Open Website"
                  href={`${
                    url && url.slice(0, 4) == "http" ? url : "https://" + url
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                style={{ marginLeft: "auto" }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
          </CardContent>
        </Grid>
      </Grid>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="body2"
            // color="text.secondary"
            component="div"
          >
            {desc}
          </Typography>{" "}
        </CardContent>
      </Collapse>
    </Card>
  );
}
