import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function EditProfile() {
  return (
    <div style={{ margin: "3em 2em" }}>
      <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
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
              alt="Remy Sharp"
              src="https://avatars.dicebear.com/api/bottts/.svg"
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
            <TextField
              required
              label="Image Url"
              fullWidth
              sx={{ margin: "0.5em 0" }}
            />
            <TextField
              required
              label="Full Name"
              fullWidth
              sx={{ margin: "0.5em 0" }}
            />
            <TextField
              required
              label="Tagline"
              fullWidth
              sx={{ margin: "0.5em 0" }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Bio"
              multiline
              rows={5}
              fullWidth
              // value={value}
              // onChange={handleChange}
              sx={{ margin: "0.5em 0" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              label="Location"
              fullWidth
              sx={{ margin: "0.5em 0" }}
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
                  label="LinkedIn Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
                <TextField
                  label="Twitter Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
                <TextField
                  label="Github Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
                <TextField
                  label="Medium Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {" "}
                <TextField
                  label="Dev.to Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
                <TextField
                  label="Hashnode Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
                <TextField
                  label="leetCode Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
                <TextField
                  label="HackerRank Profile Url"
                  fullWidth
                  sx={{ margin: "0.5em 0" }}
                />
              </Grid>
            </Grid>
            <TextField label="Other Url" fullWidth sx={{ margin: "0.5em 0" }} />

            <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
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
        ></Box>
        <TextField
          label="Add Skills"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          helperText="Please enter the skill and press enter"
        />
        <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
          Save Changes
        </Button>
      </Paper>
      <Paper sx={{ padding: "1em", margin: "0.5em 0" }}>
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
        ></Box>
        <TextField
          label="Add Languages"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          helperText="Please enter the spoken language and press enter"
        />
        <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
          Save Changes
        </Button>
      </Paper>
    </div>
  );
}
