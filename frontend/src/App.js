// import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';


function App() {
  return (
    <Router>
      {/* <Header /> */}
      

          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />


          {/* <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact /> */}
          {/* <HomeScreen/> */}
      
    </Router>
  );
}

export default App;
