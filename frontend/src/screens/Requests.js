import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../components/Loader";
import { getRequests, cancelRequest } from "../actions/userActions";

export default function Requests() {
  const dispatch = useDispatch();
  const { loading, requests } = useSelector((state) => state.requests);
  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);
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
      <Loader loading={loading} />
      {requests?.map((request) => (
        <RequestCard
          key={request._id}
          teamId={request.teamId}
          teamName={request.teamName}
        />
      ))}
    </Paper>
  );
}

function RequestCard({ teamId, teamName }) {
  const dispatch = useDispatch();
  const handleCancelRequest = () => {
    dispatch(cancelRequest(teamId));
  };
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
        {teamName}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        startIcon={<CloseIcon />}
        onClick={handleCancelRequest}
      >
        Cancel
      </Button>
    </Paper>
  );
}
