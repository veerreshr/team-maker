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
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  timelineItem: {
    "&:before": {
      flex: "0 !important",
      padding: "0 !important",
    },
  },
}));

function Certification({ certifications }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
        Certification
      </Typography>
      <Timeline align={"left"}>
        {certifications.length === 0 && "No Information Available"}
        {certifications.length > 0 &&
          certifications.map((c) => (
            <TimelineItem className={classes.timelineItem}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="overline" gutterBottom>
                      {c.issueDate} -{" "}
                      {`${c.expiryDate ? c.expiryDate : "present"}`}
                    </Typography>
                    <Typography variant="h5" component="h5">
                      {c.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {c.issuingOrg}
                    </Typography>
                    <Typography color="textSecondary">
                      {c.credentialId && `Credential Id : ${c.credentialId}`}
                    </Typography>
                  </CardContent>
                  {c.credentialUrl && (
                    <CardActions>
                      <Button
                        size="small"
                        component={Link}
                        to={{ pathname: c.credentialUrl }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certification
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </div>
  );
}

export default Certification;
