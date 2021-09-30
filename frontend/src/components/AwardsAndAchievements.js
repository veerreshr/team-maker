import React from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

function AwardsAndAchievements() {
  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
        Awards And Achievements
      </Typography>
      <div style={{ marginBottom: "1em" }}>
        <Card variant="outlined" style={{ margin: "0.5em 0" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              style={{ fontWeight: "400" }}
            >
              Smart India Hackathon Winner
            </Typography>
            <Typography variant="body2" component="p">
              Description about your work here. some random description some
              random description
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">link</Button>
          </CardActions>
        </Card>
        <Card variant="outlined" style={{ margin: "0.5em 0" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              style={{ fontWeight: "400" }}
            >
              Smart India Hackathon Winner
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" style={{ margin: "0.5em 0" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              style={{ fontWeight: "400" }}
            >
              Smart India Hackathon Winner
            </Typography>
            <Typography variant="body2" component="p">
              Description about your work here. some random description some
              random description
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" style={{ margin: "0.5em 0" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h6"
              style={{ fontWeight: "400" }}
            >
              Smart India Hackathon Winner
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AwardsAndAchievements;
