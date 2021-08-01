import React, { useState } from "react";
import { filterTeamsByPreferences } from "../actions/teamActions";
import { useDispatch } from "react-redux";

function Filter({ history, isModal }) {
  const dispatch = useDispatch();
  const [eventname, setEventname] = useState("");
  const [languages, setLanguages] = useState("");
  const [skills, setSkills] = useState("");
  const filter = () => {
    dispatch(filterTeamsByPreferences(eventname, languages, skills));
    history.push("/filteredteamlist");
  };
  return (
    <div class="container">
      <div>
        <h2>Filters</h2>
      </div>
      <form>
        <div className="my-2">
          <label class="form-label">Enter Event Name</label>
          <input
            class="form-control"
            type="text"
            value={eventname}
            onChange={(e) => setEventname(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label class="form-label">Language Preferences</label>
          <input
            class="form-control"
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label class="form-label">Skill Preferences</label>
          <input
            class="form-control"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div class="mt-4">
          <button class="btn btn-primary w-100" type="button" onClick={filter}>
            Search Teams
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filter;
