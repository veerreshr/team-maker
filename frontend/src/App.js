import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
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
import React,{ useState ,useEffect} from 'react'
import { useSelector } from 'react-redux';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loggedIn,setLoggedIn]=useState(false)
  useEffect(()=>{
      if(userInfo)setLoggedIn(true)
  },[userLogin,userInfo]);
  return (
    loggedIn ?
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
        </Router> : <Router>
          <NavBar/>
          <Redirect to={{pathname:'/login'}} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </Router>
  );
}

export default App;
