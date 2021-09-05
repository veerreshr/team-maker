import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(name, email, about, skills, languages, password));
    }
  };
  return (
    <div className="register">
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <form method="post">
        <h2>Register Form</h2>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingName"
            name="name"
            placeholder="First Name + Last Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="yourmail@yourmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label">Email</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            name="about"
            placeholder="Describe yourself. This is the first thing everyone sees."
            rows="5"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <label className="form-label">About</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="eg. javascript, python, html"
            name="about"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <label className="form-label">
            Skills - Enter comma separated values{" "}
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="eg. English, Hindi"
            name="languages"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
          <label className="form-label">
            Languages- Enter comma separated values
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Enter a strong password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="confirm password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className="form-label">Confirm Password</label>
        </div>
        <div className="mb-3">
          <button
            className="btn btn-primary d-block w-100"
            onClick={submitHandler}
          >
            Register
          </button>
        </div>
        Already have an Account ?&nbsp;&nbsp;
        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Login{" "}
        </Link>
      </form>
    </div>
  );
}

export default RegisterScreen;
