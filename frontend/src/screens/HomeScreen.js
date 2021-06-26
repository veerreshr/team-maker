import React from 'react'
import { Link } from "react-router-dom";
import { logout } from "./../actions/userActions";
import { useDispatch ,useSelector} from "react-redux";

function HomeScreen({history}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const createTeamHandler=()=>{
history.push('/createTeam')
  }
  const joinTeamHandler=()=>{
    history.push('/joinTeam')
  }
  return (
    <div>
       <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
      <div className="container text-white">
        <Link className="navbar-brand" href="#">Team Maker</Link><button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span ><span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" href="#">Link 1</Link>
            </li>
            <li className="nav-item"><Link className="nav-link" href="#">Link 2</Link></li>
            <li className="nav-item"><Link className="nav-link" href="#">Link 3</Link></li>
          </ul>
          <form className="me-auto search-form border rounded px-1" target="_self">
            <div className="d-flex align-items-center">
              <label className="form-label d-flex mb-0" for="search-field"
                ><i className="fa fa-search"></i></label
              ><input
                className="form-control search-field text-dark"
                type="search"
                id="search-field"
                name="search"
              />
            </div>
          </form>
          <Link className="btn btn-light action-button ml-auto" role="button" onClick={logoutHandler}
            >Logout</Link
          >
        </div>
      </div>
    </nav>
    {userInfo?<div>
      <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <button className="btn btn-primary w-100" type="button" onClick={createTeamHandler}>
            Create a team
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary w-100" type="button" onClick={joinTeamHandler}>
            Join a Team
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div className="container">
      <h3>Recommendations<br /></h3>
    </div>
    <div className="container">
      <div className="card my-2">
        <div className="card-body">
          <h4 className="card-title">Title</h4>
          <h6 className="text-muted card-subtitle mb-2">Subtitle</h6>
          <p className="card-text">
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
            mi porta gravida at eget metus.
          </p>
          <Link className="card-link" href="#">Link</Link
          ><Link className="card-link" href="#">Link</Link>
        </div>
      </div>
      <div className="card my-2">
        <div className="card-body">
          <h4 className="card-title">Title</h4>
          <h6 className="text-muted card-subtitle mb-2">Subtitle</h6>
          <p className="card-text">
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
            mi porta gravida at eget metus.
          </p>
          <Link className="card-link" href="#">Link</Link
          ><Link className="card-link" href="#">Link</Link>
        </div>
      </div>
      <div className="card my-2">
        <div className="card-body">
          <h4 className="card-title">Title</h4>
          <h6 className="text-muted card-subtitle mb-2">Subtitle</h6>
          <p className="card-text">
            Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo
            odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non
            mi porta gravida at eget metus.
          </p>
          <Link className="card-link" href="#">Link</Link
          ><Link className="card-link" href="#">Link</Link>
        </div>
      </div>
    </div>

    </div> : <p>You are not authenticated</p>}

    </div>
  )
}

export default HomeScreen
