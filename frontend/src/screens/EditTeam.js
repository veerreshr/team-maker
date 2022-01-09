import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  editTeamDetails,
  getTeamById,
  changeTeamPassword,
} from "./../actions/teamActions";
import Message from "./../components/Message";
import Loader from "./../components/Loader";

export default function EditTeam({ match }) {
  const teamId = match.params?.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventNames, setEventNames] = useState("");

  const { loading, error, team } = useSelector(
    (state) => state.teamsSection?.selectedTeamDetails
  );

  useEffect(() => {
    if (teamId) {
      if (team) {
        setName(team.teamName);
        setDescription(team.description);
        setEventNames(team.eventsParticipating?.toString());
      } else {
        dispatch(getTeamById(teamId));
      }
    }
  }, [teamId, dispatch, team]);

  const hanldeSaveDetails = () => {
    const teamDetails = {
      teamid: teamId,
      name: name,
      description: description,
      events_participating: eventNames
        .split(",")
        .map((eventName) => eventName.trim()),
    };
    dispatch(editTeamDetails(teamDetails));
  };
  return (
    <Box
      sx={{
        margin: {
          xs: 1,
          md: 3,
        },
      }}
    >
      <Loader loading={loading} />
      {error && <Message variant="error">{error}</Message>}
      {team && (
        <>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="event-names"
              label="Event Names"
              variant="outlined"
              helperText="Enter comma seprated event names. Ex: Hack1,Hack2"
              fullWidth
              sx={{ mb: 1 }}
              value={eventNames}
              onChange={(e) => setEventNames(e.target.value)}
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              fullWidth
              onClick={hanldeSaveDetails}
            >
              Save Details
            </Button>
          </Paper>
          <ChangePassword teamId={teamId} />
        </>
      )}
    </Box>
  );
}
function ChangePassword({ teamId }) {
  const dispatch = useDispatch();
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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    dispatch(changeTeamPassword(teamId, currentPassword, newPassword));
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
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
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
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        fullWidth
        onClick={handleChangePassword}
      >
        Change Password
      </Button>
    </Paper>
  );
}
