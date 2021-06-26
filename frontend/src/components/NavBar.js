import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function NavBar() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const [loggedIn,setLoggedIn]=useState(false)
    const logoutHandler = () => {
      dispatch(logout());
    };
    useEffect(()=>{
        if(userInfo)setLoggedIn(true)
    },[userInfo]);

    return (
        loggedIn && <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
        <div className="container text-white">
          <Link className="navbar-brand" to="/">Team Maker</Link><button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <span className="visually-hidden">Toggle navigation</span ><span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><Link className="nav-link" to="/myteams">My Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/aboutuser/123456789">My Profile</Link></li>
            </ul>
            <Link className="btn btn-light action-butto" role="button" onClick={logoutHandler}
              >Logout</Link
            >
          </div>
        </div>
      </nav>
    )

        
}

export default NavBar
