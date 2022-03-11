import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { searchForTeamsAction } from "./../actions/teamActions";
import Loader from "./../components/Loader";
import { sendRequestToJoinTeamAction } from "../actions/teamActions";
import { ReactComponent as NoTeamsFound } from "../assets/no-teams-found.svg";
import Box from "@mui/material/Box";

export default function SearchForTeams({ match, history }) {
  const teamName = match.params.teamName ? match.params.teamName : "";
  const dispatch = useDispatch();
  const { loading, error, teams } = useSelector(
    (state) => state.teamsSection?.searchedTeams
  );
  // const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(searchForTeamsAction(teamName));
  }, [dispatch, teamName]);
  return (
    <>
      <Loader loading={loading} />
      <SearchComponent history={history} />
      <Paper
        elevation={3}
        sx={{
          margin: {
            xs: 1,
            md: 3,
          },
          padding: 1,
        }}
      >
        {teams && teams.length > 0 ? (
          teams.map((t) => (
            <TeamCardComponent
              key={t.id}
              id={t.id}
              name={t.name}
              desc={t.desc}
              admins={t.admins}
            />
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
            }}
          >
            <NoTeamsFound width="43%" />
          </Box>
        )}
      </Paper>
    </>
  );
}

function SearchComponent({ history }) {
  const [teamname, setTeamname] = useState("");
  const handleSearch = (e) => {
    history.push("/teams/" + teamname);
  };
  const handleSearchByKeyDown = (e) => {
    if (e.keyCode === 13) handleSearch();
  };
  return (
    <Paper
      elevation={3}
      sx={{
        margin: {
          xs: 1,
          md: 3,
        },
        padding: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={11}>
          <TextField
            id="search-for-teams"
            label="Search"
            placeholder="Search by team name...."
            variant="outlined"
            fullWidth
            size="small"
            value={teamname}
            onChange={(e) => setTeamname(e.target.value)}
            onKeyDown={handleSearchByKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={handleSearch}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            variant="contained"
            endIcon={<FilterAltIcon />}
            fullWidth
            disabled
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

function TeamCardComponent({ id, name, desc, admins }) {
  const dispatch = useDispatch();
  const sendRequestHandler = () => {
    dispatch(sendRequestToJoinTeamAction(id));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: {
          xs: 1,
          md: 3,
        },
        padding: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h6" component="h6" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {desc}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" gutterBottom component="div">
              Admins :
            </Typography>
            {admins.map((admin) => (
              <a
                href={`/u/${admin.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Avatar
                  sx={{ width: 28, height: 28, fontSize: 16 }}
                  src={admin.photo}
                  alt={admin.username}
                />
              </a>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            onClick={sendRequestHandler}
          >
            Send Request
          </Button>
          <Button
            variant="contained"
            endIcon={<InfoIcon />}
            fullWidth
            size="small"
            color="secondary"
            disabled
          >
            More Info
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
