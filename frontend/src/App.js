import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NavBar from "./components/NavBar";
import CreateTeam from "./screens/CreateTeam";
// import TeamView from "./screens/TeamView";
import AboutTeam from "./screens/AboutTeam";
import MyTeams from "./screens/MyTeams";
import AddEvent from "./screens/AddEvent";
import ProtectedRoute from "./ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingScreen from "./screens/LandingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PageNotFound from "./components/PageNotFound";
import EditProfile from "./screens/EditProfile";
import SearchForTeams from "./screens/SearchForTeams";
import Requests from "./screens/Requests";
import EditTeam from "./screens/EditTeam";
import React from "react";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#34495e",
      },
      secondary: {
        main: "#bdc3c7",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/*" component={NavBar} />
        <Switch>
          <Route path="/u/:username" component={ProfileScreen} exact />
          <Route path="/landing" component={LandingScreen} />
          <Route path="/login" render={(props) => <LoginScreen {...props} />} />
          <Route
            path="/register"
            render={(props) => <RegisterScreen {...props} />}
          />
          <ProtectedRoute path="/" component={HomeScreen} exact />
          <ProtectedRoute path="/editprofile" component={EditProfile} exact />
          <ProtectedRoute path="/createTeam" component={CreateTeam} exact />
          <ProtectedRoute path="/editTeam/:id" component={EditTeam} exact />
          <ProtectedRoute path="/teams" component={SearchForTeams} exact />
          <ProtectedRoute
            path="/teams/:teamName"
            component={SearchForTeams}
            exact
          />
          {/* <ProtectedRoute path="/teams/:id" component={TeamView} exact /> */}
          <ProtectedRoute path="/aboutteam/:id" component={AboutTeam} exact />
          <ProtectedRoute
            path="/myTeams"
            render={(props) => <MyTeams {...props} />}
            exact
          />
          <ProtectedRoute
            path="/myTeams/:teamId"
            render={(props) => <MyTeams {...props} />}
            exact
          />
          <ProtectedRoute path="/requests" component={Requests} exact />
          <ProtectedRoute path="/addevent" component={AddEvent} exact />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
