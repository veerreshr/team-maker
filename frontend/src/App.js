// import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import LoginScreen from "./screens/LoginScreen";


function App() {
  return (
    <Router>
      {/* <Header /> */}
      <main className="py-3">
        <Container>

          {/* <Route path="/login" component={LoginScreen} /> */}


          {/* <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact /> */}
          <HomeScreen/>
        </Container>
      </main>
    </Router>
  );
}

export default App;
