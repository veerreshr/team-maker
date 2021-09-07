import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  timelineItem: {
    "&:before": {
      flex: "0",
      padding: "0",
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
