import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function EditTeam() {
  return (
    <Box
      sx={{
        margin: {
          xs: 1,
          md: 3,
        },
      }}
    >
      <Paper elevation={2} sx={{ padding: 2, mb: 2 }}>
        <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
          Edit Team
        </Typography>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          helperText="Enter Team Name"
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          multiline
          rows={4}
        />
        <TextField
          id="event-names"
          label="Event Names"
          variant="outlined"
          helperText="Enter comma seprated event names. Ex: Hack1,Hack2"
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
          Save Details
        </Button>
      </Paper>
      <ChangePassword />
    </Box>
  );
}
function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Paper elevation={2} sx={{ padding: 2, mb: 2 }}>
      <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
        Change Password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="currentPassword"
        label="Current Password"
        id="currentPassword"
        autoComplete="current-password"
        type={showCurrentPassword ? "text" : "password"}
        helperText="Enter your current password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowCurrentPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        id="newPassword"
        autoComplete="new-password"
        type={showNewPassword ? "text" : "password"}
        helperText="Enter your new password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowNewPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" startIcon={<SaveIcon />} fullWidth>
        Change Password
      </Button>
    </Paper>
  );
}
