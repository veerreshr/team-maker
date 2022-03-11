import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import { createTeamAction } from "./../actions/teamActions";
import { useDispatch } from "react-redux";

function CreateTeam({ location: { search } }) {
  const eventNameQuery = new URLSearchParams(search).get("eventName");

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [events, setEvents] = useState(eventNameQuery ? eventNameQuery : "");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventList = events.split(",");
    dispatch(createTeamAction(teamName, eventList, password));
  };
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 70, height: 70 }}>
        <AddCircleIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create a Team
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Team Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="events"
          label="Event Names"
          name="events"
          autoComplete="events"
          helperText="Enter comma separated event names that you are participating in. Ex: hack1,hack2...."
          value={events}
          onChange={(e) => setEvents(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          startIcon={<AddIcon />}
        >
          Create a Team
        </Button>
      </Box>
    </Box>
  );
}

export default CreateTeam;
