import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
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

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <ProtectedRoute path="/" component={HomeScreen} exact />
      <ProtectedRoute path="/createTeam" component={CreateTeam} exact />
      <ProtectedRoute path="/joinTeam" component={JoinTeam} exact />
      <ProtectedRoute path="/teams/:id" component={TeamView} exact />
      <ProtectedRoute path="/aboutuser/:id" component={AboutUser} exact />
      <ProtectedRoute
        path="/filteredteamlist"
        component={FilteredTeamList}
        exact
      />
      <ProtectedRoute path="/aboutteam/:id" component={AboutTeam} exact />
      <ProtectedRoute path="/teams" component={MyTeams} exact />
      <ProtectedRoute path="/addevent" component={AddEvent} exact />
    </Router>
  );
}

export default App;
