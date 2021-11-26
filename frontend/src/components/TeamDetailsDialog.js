import * as React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TeamDetailsDialog({ open, handleClose }) {
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
            Team Zero
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Edit
          </Button>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
            suscipit, quam beatae rerum inventore consectetur, neque doloribus,
            cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi
            quidem quibusdam.Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
            inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.Lorem ipsum dolor sit
            amet, consectetur adipisicing elit.
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="h6" component="h6">
            Participating Events:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip label="Hack 1" />
            <Chip label="Hack 2" />
          </Stack>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            Members
          </Typography>
          <Grid container spacing={1}>
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, my: 1 }}>
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            Requests
          </Typography>
          <Grid container spacing={1}>
            <TeamRequestCard />
            <TeamRequestCard />
            <TeamRequestCard />
            <TeamRequestCard />
          </Grid>
        </Paper>
      </Box>
    </Dialog>
  );
}
function TeamRequestCard() {
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
            Veeresh
          </Typography>
          <Box>
            <Button
              size="medium"
              color="success"
              aria-label="accept request"
              sx={{ mr: 1, borderRadius: 24 }}
              variant="contained"
            >
              <CheckIcon />
            </Button>
            <Button
              size="medium"
              aria-label="reject request"
              color="error"
              sx={{ borderRadius: 24 }}
              variant="contained"
            >
              <CloseIcon />
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

function TeamMemberCard() {
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
              Veeresh
            </Typography>
            <Typography variant="caption" component="div">
              Admin
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            size="small"
            color="error"
          >
            Remove
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
}
