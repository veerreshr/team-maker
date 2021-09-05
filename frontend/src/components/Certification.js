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
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  timelineItem: {
    "&:before": {
      flex: "0",
      padding: "0",
    },
  },
}));

function Certification() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
        Certification
      </Typography>
      <Timeline align={"left"}>
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
                  AWS Certified Solutions Architect
                </Typography>
                <Typography color="textSecondary">Amazon</Typography>
                <Typography color="textSecondary">
                  Credential Id : 1234567890
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Certification</Button>
              </CardActions>
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
                  AWS Certified Solutions Architect
                </Typography>
                <Typography color="textSecondary">Amazon</Typography>
                <Typography color="textSecondary">
                  Credential Id : 1234567890
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
                  AWS Certified Solutions Architect
                </Typography>
                <Typography color="textSecondary">Amazon</Typography>
                <Typography color="textSecondary">
                  Credential Id : 1234567890
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Certification</Button>
              </CardActions>
            </Card>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default Certification;
