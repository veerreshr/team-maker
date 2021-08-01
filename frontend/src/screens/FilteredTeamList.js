import React from "react";
import { Link } from "react-router-dom";
import Loader from "./../components/Loader";
import { useSelector } from "react-redux";

function FilteredTeamList({ history }) {
  const { loading, teams } = useSelector((state) => state.filteredteams);
  const openFilterModal = () => {
    history.push("/joinTeam");
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div class="container mt-3">
          <div>
            <h1>Search Teams</h1>
          </div>
          <div>
            <button
              class="btn btn-primary w-100"
              type="button"
              onClick={openFilterModal}
            >
              Edit Filter&nbsp;&nbsp;<i class="icon ion-edit"></i>&nbsp;
            </button>
          </div>
          <div>
            {teams &&
              teams.map((t) => (
                <div class="card my-3">
                  <div class="card-body">
                    <Link to={`/aboutteam/${t._id}`}>
                      <h4 class="card-title text-capitalize">{t.name}</h4>
                    </Link>
                    <h6 class="text-muted card-subtitle mb-2 text-capitalize">
                      Event Name: {t.eventname}
                    </h6>
                    <h6 class="text-muted card-subtitle mb-2 text-capitalize">
                      Skills :{" "}
                      {t.preferences.skills.map((l, i) => {
                        if (i == t.preferences.skills.length - 1)
                          return l + ".";
                        return l + ", ";
                      })}
                    </h6>
                    <h6 class="text-muted card-subtitle mb-2 text-capitalize">
                      Languages:{" "}
                      {t.preferences.languages.map((l, i) => {
                        if (i == t.preferences.languages.length - 1)
                          return l + ".";
                        return l + ", ";
                      })}
                    </h6>
                    <p class="card-text">{t.desc}</p>
                    <Link class="card-link" href="#">
                      Send Request&nbsp;<i class="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FilteredTeamList;
