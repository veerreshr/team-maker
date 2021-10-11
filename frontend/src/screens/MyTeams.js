import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myTeamsAction } from "../actions/teamActions";
import { useDispatch, useSelector } from "react-redux";

function MyTeams({ history }) {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.myteams);
  useEffect(() => {
    dispatch(myTeamsAction());
  }, []);
  return (
    <div class="container">
      <h2 className="my-2">My Teams</h2>
      {teams &&
        teams.map((t) => (
          <div class="card my-3">
            <div class="card-body">
              <Link to={`/teams/${t._id}`}>
                <h4 class="card-title">{t.name}</h4>
              </Link>
              <p class="text-muted card-subtitle">
                <strong>Event Name</strong>: {t.eventname}
              </p>
              <p class="card-text d-inline-block text-truncate">{t.desc}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyTeams;
