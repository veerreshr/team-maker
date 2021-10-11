import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Chat from "./../components/Chat";
import Whiteboard from "./../components/Whiteboard";
import { useDispatch, useSelector } from "react-redux";
import { teamViewAction } from "./../actions/teamActions";

function TeamView({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.teamview);
  useEffect(() => {
    dispatch(teamViewAction(id));
  }, []);
  return (
    <>
      {team && (
        <div class="container">
          <div class="my-2 border-primary bg-primary text-white rounded-3 p-3">
            <h3>&nbsp;&nbsp;{team ? team.name : ""}</h3>
          </div>
          <div class="my-3">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  role="tab"
                  data-bs-toggle="tab"
                  href="#tab-1"
                >
                  Home
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  role="tab"
                  data-bs-toggle="tab"
                  href="#tab-2"
                >
                  Chat&nbsp;
                  <span className="font-weight-light">(experimental)</span>
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  role="tab"
                  data-bs-toggle="tab"
                  href="#tab-3"
                >
                  White Board&nbsp;
                  <span className="font-weight-light">(experimental)</span>
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" role="tabpanel" id="tab-1">
                <div className="mt-3">
                  <h4 class="bg-info text-white p-2">Team Members</h4>
                  {team &&
                    team.members.map((member) => (
                      <div class="my-3">
                        <div class="card">
                          <div class="card-body">
                            <Link to={`/aboutuser/${member._id}`}>
                              <h4 class="card-title">{member.name}</h4>
                            </Link>
                            <h6 class="text-muted card-subtitle">
                              <strong>Status </strong>:{" "}
                              {team.leader == member._id ? "Leader" : "Member"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}

                  <hr />
                  <h4 class="bg-info text-white p-2 rounded-3">
                    Team Joining Requests
                  </h4>
                  {team &&
                    team.requests.map((req) => (
                      <div class="my-3">
                        <div class="card">
                          <div class="card-body row">
                            <Link
                              className="col-sm-7"
                              to={`/aboutuser/${req._id}`}
                            >
                              <h4 class="card-title">{req.name}</h4>
                            </Link>
                            <div class="btn-group col-sm-5" role="group">
                              <button
                                class="btn btn-primary mx-1"
                                type="button"
                              >
                                Accept&nbsp;&nbsp;<i class="fa fa-check"></i>
                              </button>
                              <button
                                class="btn btn-primary mx-1"
                                type="button"
                              >
                                Reject&nbsp;&nbsp;<i class="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div class="tab-pane" role="tabpanel" id="tab-2">
                <Chat />
              </div>
              <div class="tab-pane" role="tabpanel" id="tab-3">
                <Whiteboard />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamView;
