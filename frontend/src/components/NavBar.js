import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";

function NavBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (userInfo) setLoggedIn(true);
  }, [userInfo, dispatch]);

  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
      <div className="container text-white">
        <Link className="navbar-brand" to="/">
          Team Maker
        </Link>

        {loggedIn && (
          <>
            {" "}
            <button
              data-bs-toggle="collapse"
              className="navbar-toggler"
              data-bs-target="#navcol-1"
            >
              <span className="visually-hidden"></span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    My Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={userInfo && `/aboutuser/${userInfo._id}`}
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
              <Link
                className="btn btn-light action-button"
                role="button"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
