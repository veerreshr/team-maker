import {
CREATE_TEAM_REQUEST,
CREATE_TEAM_SUCCESS,
CREATE_TEAM_FAIL
  } from "../constants/teamConstants";

export const createTeamReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_TEAM_REQUEST:
        return { loading: true};
      case CREATE_TEAM_SUCCESS:
        return { loading: false, newTeam: action.payload };
      case CREATE_TEAM_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
export const myTeams = (state = {}, action) => {
    switch (action.type) {
      case CREATE_TEAM_REQUEST:
        return { loading: true};
      case CREATE_TEAM_SUCCESS:
        return { loading: false, teams: action.payload };
      case CREATE_TEAM_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  