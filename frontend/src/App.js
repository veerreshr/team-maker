// import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen';

function App() {
 const userInfo= localStorage.getItem('userInfo')
  return (
    <Router>

          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/" component={HomeScreen} exact />
      
    </Router>
  );
}

export default App;
