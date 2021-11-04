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

function Education({ educationList }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
        Education
      </Typography>
      <Timeline align={"left"}>
        {educationList.length === 0 && "No Information Available"}
        {educationList.length > 0 &&
          educationList.map((e) => (
            <TimelineItem className={classes.timelineItem}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="overline" gutterBottom>
                      {e.startDate.substring(0, 10)} -{" "}
                      {`${e.endDate ? e.endDate.substring(0, 10) : "present"}`}
                    </Typography>
                    <Typography variant="h5" component="h5">
                      {e.schoolName}
                    </Typography>
                    <Typography color="textSecondary">
                      {e.degree} {e.fieldOfStudy && `, ${e.fieldOfStudy}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {e.description}
                    </Typography>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </div>
  );
}

export default Education;
