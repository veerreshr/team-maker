import React,{ useEffect,useState }  from 'react'
import { Link } from "react-router-dom";
import { login } from "./../actions/userActions";
import { useDispatch,useSelector } from 'react-redux';
import Message from './../components/Message';
import Loader from './../components/Loader';

function LoginScreen({ location, history }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-clean min-vh-100">
      <form>
        <h2 className="visually-hidden">Login Form</h2>
        <div className="illustration"><i className="icon ion-locked"></i></div>
        {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary d-block w-100" onClick={submitHandler}>
            Log In
          </button>
        </div>
             <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
             New user? Register here      
            </Link>
      </form>
    </div>
  )
}

export default LoginScreen
