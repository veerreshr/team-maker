import React from "react";
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

function SearchComponent() {
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
            placeholder="Search by event name...."
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment>
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

export default function SearchForTeams() {
  return (
    <>
      <SearchComponent />
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
        <TeamCardComponent />
        <TeamCardComponent />
        <TeamCardComponent />
        <TeamCardComponent />
      </Paper>
    </>
  );
}
function TeamCardComponent() {
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
            Team Zero
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>

          <Stack direction="row" spacing={1}>
            <Typography variant="subtitle2" gutterBottom component="div">
              Admins :
            </Typography>
            <Avatar sx={{ width: 28, height: 28, fontSize: 16 }}>H</Avatar>
            <Avatar sx={{ width: 28, height: 28, fontSize: 16 }}>N</Avatar>
            <Avatar sx={{ width: 28, height: 28, fontSize: 16 }}>OP</Avatar>
            <Avatar sx={{ width: 28, height: 28, fontSize: 16 }}>H</Avatar>
            <Avatar sx={{ width: 28, height: 28, fontSize: 16 }}>H</Avatar>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            fullWidth
            size="small"
            sx={{ mb: 1 }}
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
