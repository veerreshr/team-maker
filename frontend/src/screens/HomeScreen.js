import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const createTeamHandler = () => {
    history.push("/createTeam");
  };
  const joinTeamHandler = () => {
    history.push("/joinTeam");
  };
  return (
    <div>
      <div>
        <div className="container">
          <div className="row my-5">
            <div className="col-md-6">
              <button
                className="btn btn-primary w-100 p-3 my-1"
                type="button"
                onClick={createTeamHandler}
              >
                Create a team
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary w-100 p-3 my-1"
                type="button"
                onClick={joinTeamHandler}
              >
                Join a Team
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <h3>
            Recommendations
            <br />
          </h3>
        </div>
        <div className="container">
          <div className="card my-2">
            <div className="card-body">
              <h4 className="card-title">Name of Event</h4>
              <h6 className="text-muted card-subtitle mb-2">
                start date : dd/mm/yyyy
              </h6>
              <p className="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                justo odio, dapibus ac facilisis in, egestas eget quam. Donec id
                elit non mi porta gravida at eget metus.
              </p>
              <Link className="card-link" to="/createTeam?name=Nameofevent">
                Create Team
              </Link>
            </div>
          </div>
          <div className="card my-2">
            <div className="card-body">
              <h4 className="card-title">Name of Event</h4>
              <h6 className="text-muted card-subtitle mb-2">
                start date : dd/mm/yyyy
              </h6>
              <p className="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                justo odio, dapibus ac facilisis in, egestas eget quam. Donec id
                elit non mi porta gravida at eget metus.
              </p>
              <Link className="card-link" to="/createTeam?name=Nameofevent">
                Create Team
              </Link>
            </div>
          </div>
          <div className="card my-2">
            <div className="card-body">
              <h4 className="card-title">Name of Event</h4>
              <h6 className="text-muted card-subtitle mb-2">
                start date : dd/mm/yyyy
              </h6>
              <p className="card-text">
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras
                justo odio, dapibus ac facilisis in, egestas eget quam. Donec id
                elit non mi porta gravida at eget metus.
              </p>
              <Link className="card-link" to="/createTeam?name=Nameofevent">
                Create Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
