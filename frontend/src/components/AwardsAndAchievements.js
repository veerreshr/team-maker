import React from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AwardsAndAchievements({ achievements }) {
  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
        Awards And Achievements
      </Typography>
      <div style={{ marginBottom: "1em" }}>
        {achievements.length === 0 && (
          <p style={{ marginLeft: "1em" }}>No Information Available</p>
        )}
        {achievements.length > 0 &&
          achievements.map((a) => (
            <Card variant="outlined" style={{ margin: "0.5em 0" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ fontWeight: "400" }}
                >
                  {a.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {a.desc}
                </Typography>
              </CardContent>
              {a.link && (
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={{ pathname: a.link }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    link
                  </Button>
                </CardActions>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
}

export default AwardsAndAchievements;
