import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/Register";
import NavBar from "./components/NavBar";
import CreateTeam from "./screens/CreateTeam";
import JoinTeam from "./screens/JoinTeam";
import TeamView from "./screens/TeamView";
import AboutUser from "./screens/AboutUser";
import FilteredTeamList from "./screens/FilteredTeamList";
import AboutTeam from "./screens/AboutTeam";
import MyTeams from "./screens/MyTeams";
import AddEvent from "./screens/AddEvent";
import ProtectedRoute from "./ProtectedRoute";
import { createTheme } from "@material-ui/core/styles";
import white from "@material-ui/core/colors/green";
import { ThemeProvider } from "@material-ui/styles";
import LandingScreen from "./screens/LandingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PageNotFound from "./components/PageNotFound";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#a6d4fa",
      },
      secondary: {
        main: white[100],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <NavBar /> */}
        <Route path="/*" component={NavBar} />
        <Switch>
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/landing" component={LandingScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <ProtectedRoute path="/" component={HomeScreen} exact />
          <ProtectedRoute path="/createTeam" component={CreateTeam} exact />
          <ProtectedRoute path="/joinTeam" component={JoinTeam} exact />
          <ProtectedRoute path="/teams/:id" component={TeamView} exact />
          <ProtectedRoute path="/profile/:id" component={AboutUser} exact />
          <ProtectedRoute
            path="/filteredteamlist"
            component={FilteredTeamList}
            exact
          />
          <ProtectedRoute path="/aboutteam/:id" component={AboutTeam} exact />
          <ProtectedRoute path="/teams" component={MyTeams} exact />
          <ProtectedRoute path="/addevent" component={AddEvent} exact />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
