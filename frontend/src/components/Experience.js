import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  timelineItem: {
    "&:before": {
      flex: "0 !important",
      padding: "0 !important",
    },
  },
}));

function Experience() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
        Experience
      </Typography>
      <Timeline align={`left`}>
        <TimelineItem className={classes.timelineItem}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline" gutterBottom>
                  Aug/18 - present
                </Typography>
                <Typography variant="h5" component="h5">
                  Software Engineer II
                </Typography>
                <Typography color="textSecondary">Amazon, India</Typography>
                <Typography variant="body2" component="p">
                  Description about your work here. some random description some
                  random description
                </Typography>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className={classes.timelineItem}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline" gutterBottom>
                  Aug/18 - present
                </Typography>
                <Typography variant="h5" component="h5">
                  Software Engineer II
                </Typography>
                <Typography color="textSecondary">Amazon, India</Typography>
                <Typography variant="body2" component="p">
                  Description about your work here. some random description some
                  random description
                </Typography>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className={classes.timelineItem}>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="overline" gutterBottom>
                  Aug/18 - present
                </Typography>
                <Typography variant="h5" component="h5">
                  Software Engineer II
                </Typography>
                <Typography color="textSecondary">Amazon, India</Typography>
                <Typography variant="body2" component="p">
                  Description about your work here. some random description some
                  random description
                </Typography>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default Experience;
