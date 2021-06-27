import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';
import NavBar from './components/NavBar';
import CreateTeam from './screens/CreateTeam';
import JoinTeam from './screens/JoinTeam';
import TeamView from './screens/TeamView';
import AboutUser from './screens/AboutUser';
import FilteredTeamList from './screens/FilteredTeamList';
import AboutTeam from './screens/AboutTeam';
import MyTeams from './screens/MyTeams';
import AddEvent from './screens/AddEvent';

function App() {
  return (
    
    <Router>
          <NavBar/>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/createTeam" component={CreateTeam} exact />
          <Route path="/joinTeam" component={JoinTeam} exact />
          <Route path="/teamview/:id" component={TeamView} exact />
          <Route path="/aboutuser/:id" component={AboutUser} exact />
          <Route path="/filteredteamlist" component={FilteredTeamList} exact />
          <Route path="/aboutteam/:id" component={AboutTeam} exact />
          <Route path="/myteams" component={MyTeams} exact />
          <Route path="/addevent" component={AddEvent} exact />
        </Router>
  );
}

export default App;
