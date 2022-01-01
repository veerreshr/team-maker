import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

export default function Requests() {
  return (
    <Paper
      elevation={3}
      sx={{
        minHeight: "80vh",
        margin: {
          xs: 1,
          md: 3,
        },
        padding: {
          xs: 1,
          md: 3,
        },
      }}
    >
      <Typography variant="h5" component="h1">
        Requests Sent
      </Typography>

      {[1, 2, 3, 4, 5].map((i) => (
        <RequestCard key={i} />
      ))}
    </Paper>
  );
}

function RequestCard() {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "no-wrap",
        alignItems: "center",
        my: 2,
      }}
    >
      <Typography variant="h6" component="h6">
        Team Zero
      </Typography>
      <Button variant="outlined" color="error" startIcon={<CloseIcon />}>
        Cancel
      </Button>
    </Paper>
  );
}
