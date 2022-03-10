import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddIcon from "@mui/icons-material/Add";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgb(110 110 110 / 15%)",
  "&:hover": {
    backgroundColor: "rgb(110 110 110 / 25%)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");

  const handleSearchByKeyDown = (e) => {
    if (e.keyCode === 13) handleSearch();
  };
  const handleSearch = (e) => {
    history.push("/teams/" + search);
  };

  const handleDrawerOpen = () => {
    loggedIn && setOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    setLoggedIn(false);
  };
  const handleProfileClick = () => {
    history.push(`/u/${userInfo.username}`);
  };
  const handleLogin = () => {
    history.push("/login");
  };
  const handleRegister = () => {
    history.push("/register");
  };

  const toggleDrawer = (openState) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(openState);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleMenuClose();
  };

  const matches_md_up = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      onClick={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>
          {loggedIn && userInfo.name.length > 16
            ? `${userInfo?.name.substring(0, 16)}...`
            : userInfo?.name}
        </p>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    if (userInfo) setLoggedIn(true);
  }, [userInfo, dispatch]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to="/"
            style={{
              display: "contents",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src="https://res.cloudinary.com/dcgefz04y/image/upload/v1632403954/Logo_eb3l1y.png"
              alt="Team Maker Logo"
              style={{
                maxWidth: 40,
                spacing: 3,
              }}
            />
            <Typography
              variant="h6"
              display="block"
              gutterBottom
              sx={{ marginBottom: "0px", marginLeft: "5px" }}
            >
              Team Maker
            </Typography>
          </Link>

          {loggedIn ? (
            <>
              {matches_md_up && (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchByKeyDown}
                  />
                </Search>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
                <p>
                  {loggedIn && userInfo.username.length > 16
                    ? `${userInfo?.username.substring(0, 16)}...`
                    : userInfo?.username}
                </p>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="outlined"
                style={{ marginRight: "5px" }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Button
                variant="contained"
                endIcon={<LoginIcon />}
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {loggedIn &&
        menuList(
          open,
          toggleDrawer,
          history,
          handleLogout,
          handleProfileClick,
          search,
          setSearch,
          handleSearchByKeyDown
        )}
    </Box>
  );
}
function menuList(
  open,
  toggleDrawer,
  history,
  handleLogout,
  handleProfileClick,
  search,
  setSearch,
  handleSearchByKeyDown
) {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor={"left"}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Toolbar />
      <Divider />
      <Search style={{ margin: "1em" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search by Event name"
          inputProps={{ "aria-label": "search by event name" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchByKeyDown}
        />
      </Search>
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Divider />
        <List dense={true}>
          <ListItem button key={"Home"} onClick={() => history.push("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            button
            key={"Create a Team"}
            onClick={() => history.push("/createTeam")}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={"Create a Team"} />
          </ListItem>
          <ListItem
            button
            key={"Join a Team"}
            onClick={() => history.push("/teams")}
          >
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary={"Join a Team"} />
          </ListItem>
        </List>
        <Divider />
        <List dense={true}>
          <ListItem
            button
            key={"My Teams"}
            onClick={() => history.push("/myTeams")}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"My Teams"} />
          </ListItem>
          <ListItem
            button
            key={"Requests"}
            onClick={() => history.push("/requests")}
          >
            <ListItemIcon>
              <SendToMobileIcon />
            </ListItemIcon>
            <ListItemText primary={"Requests"} />
          </ListItem>
        </List>
      </div>
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        style={{ marginTop: "auto" }}
      >
        <Divider />
        <List dense={true}>
          <ListItem
            button
            key={"About Us"}
            onClick={() => {
              history.push("/landing");
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"About Us"} />
          </ListItem>
          <ListItem button key={"Profile"} onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
          <ListItem button key={"Logout"} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
}
