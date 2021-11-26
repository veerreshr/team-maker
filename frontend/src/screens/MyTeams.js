import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import TeamDetailsDialog from "./../components/TeamDetailsDialog";

export default function MyTeams() {
  return (
    <Box
      sx={{
        margin: {
          xs: 1,
          md: 3,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: "80vh",
              padding: 2,
            }}
          >
            <TeamListCard />
            <TeamListCard />
            <TeamListCard />
            <TeamListCard />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <ChatComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
function ChatComponent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          height: "84vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" component="h6">
              Team Zero
            </Typography>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleClickOpen}
            >
              <ArrowDropDownIcon />
            </IconButton>
          </Stack>
        </Paper>
        <Box
          sx={{
            padding: 2,
            flexGrow: "1",
            overflowY: "scroll",
          }}
        >
          <Box sx={{ mt: "auto" }}></Box>
          <Grid container sx={{ my: 1 }}>
            <Grid item xs={8} md={7}>
              <Typography variant="caption" component="div">
                Veeresh :
              </Typography>
              <Paper elevation={2} sx={{ padding: 1 }}>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore
                  consectetur, neque doloribus, cupiditate numquam dignissimos
                  laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container sx={{ my: 1 }}>
            <Grid item xs={4} md={5}></Grid>
            <Grid item xs={8} md={7}>
              <Typography variant="caption" component="div">
                Veeresh :
              </Typography>
              <Paper elevation={2} sx={{ padding: 1 }}>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore
                  consectetur, neque doloribus, cupiditate numquam dignissimos
                  laborum fugiat deleniti? Eum quasi quidem quibusdam.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={11}>
                <TextField
                  id="send-message"
                  label="Send Message"
                  multiline
                  maxRows={4}
                  value={value}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  sx={{ height: "100%", width: "100%" }}
                  color="primary"
                  aria-label="send"
                  component="span"
                  variant="contained"
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Paper>
      <TeamDetailsDialog open={open} handleClose={handleClose} />
    </>
  );
}

function TeamListCard() {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 1,
        my: 2,
        "&:hover": {
          backgroundColor: "#e3e3e3",
          cursor: "pointer",
        },
      }}
    >
      <Typography variant="h6" component="h6">
        Team Zero
      </Typography>
      <Typography variant="caption" component="div">
        Veeresh : Hey there, wh....
      </Typography>
    </Paper>
  );
}
