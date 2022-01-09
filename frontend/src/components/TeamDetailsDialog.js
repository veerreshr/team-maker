import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import Fab from "@mui/material/Fab";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeamRequests,
  handleRequests,
  removeMember,
} from "./../actions/teamActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TeamDetailsDialog({ open, handleClose, history }) {
  const { loading, error, team } = useSelector(
    (state) => state.teamsSection?.selectedTeamDetails
  );

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/editTeam/${team?.id}`);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {team?.teamName}
          </Typography>
          {team?.isAdmin && team?.id && (
            <Button autoFocus color="inherit" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          margin: {
            xs: 1,
            md: 3,
          },
        }}
      >
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="body1">
            {team?.description ? (
              team?.description
            ) : (
              <i>No description provided.</i>
            )}
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="h6" component="h6">
            Participating Events:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {team?.eventsParticipating?.map((eventName) => (
              <Chip label={eventName} />
            ))}
          </Stack>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            Members
          </Typography>
          <Grid container spacing={1}>
            {team?.members?.map((member) => (
              <TeamMemberCard
                key={member?.userName}
                teamid={team?.id}
                isAdmin={team?.isAdmin}
                member={member}
              />
            ))}
          </Grid>
        </Paper>
        <TeamRequestsComponent teamId={team?.id} />
      </Box>
    </Dialog>
  );
}

function TeamRequestsComponent({ teamId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (teamId) {
      dispatch(getTeamRequests(teamId));
    }
  }, [dispatch, teamId]);

  const { loading, error, requests } = useSelector(
    (state) => state.teamsSection?.teamRequests
  );
  return (
    <>
      {!loading && !error && (
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            Requests
          </Typography>
          <Grid container spacing={1}>
            {requests?.map((request) => (
              <TeamRequestCard key={teamId} teamid={teamId} request={request} />
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
}

function TeamRequestCard({ teamid, request }) {
  const dispatch = useDispatch();
  const onClickHandler = (status) => {
    dispatch(handleRequests({ teamid, status, userid: request?.userId }));
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: 2 }} elevation={2}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" component="div">
            {request.userName}
          </Typography>
          <Box>
            <Button
              size="medium"
              color="success"
              aria-label="accept request"
              sx={{ mr: 1, borderRadius: 24 }}
              variant="contained"
              onClick={() => {
                onClickHandler("accept");
              }}
            >
              <CheckIcon />
            </Button>
            <Button
              size="medium"
              aria-label="reject request"
              color="error"
              sx={{ borderRadius: 24 }}
              variant="contained"
              onClick={() => {
                onClickHandler("reject");
              }}
            >
              <CloseIcon />
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

function TeamMemberCard({ teamid, isAdmin, member }) {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeMember({ teamid, userid: member?.userId }));
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper sx={{ padding: 2 }} elevation={2}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="body1" component="div">
              {member.userName}
            </Typography>
            <Typography variant="caption" component="div">
              {member.role}
            </Typography>
          </Box>
          {isAdmin && (
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              size="small"
              color="error"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </Stack>
      </Paper>
    </Grid>
  );
}
