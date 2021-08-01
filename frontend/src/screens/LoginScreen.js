import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "./../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";

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
    <div className="login min-vh-100 mt-4">
      <form>
        <h2>Login Form</h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <div class="form-group">
          {/* <label class="form-label mt-4">Floating labels</label> */}
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="floatingPassword">Password</label>
          </div>
        </div>
        <div className="my-3">
          <button
            className="btn btn-primary d-block w-100"
            onClick={submitHandler}
          >
            Log In
          </button>
        </div>
        New user?&nbsp;&nbsp;
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register here
        </Link>
      </form>
    </div>
  );
}

export default LoginScreen;
