import {
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  GET_MY_TEAMS_REQUEST,
  GET_MY_TEAMS_SUCCESS,
  GET_MY_TEAMS_FAIL,
  GET_TEAM_VIEW_REQUEST,
  GET_TEAM_VIEW_SUCCESS,
  GET_TEAM_VIEW_FAIL,
  GET_FILTER_TEAMS_REQUEST,
  GET_FILTER_TEAMS_SUCCESS,
  GET_FILTER_TEAMS_FAIL,
} from "../constants/teamConstants";

export const createTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TEAM_REQUEST:
      return { loading: true };
    case CREATE_TEAM_SUCCESS:
      return { loading: false, newTeam: action.payload };
    case CREATE_TEAM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const myTeamsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_TEAMS_REQUEST:
      return { loading: true };
    case GET_MY_TEAMS_SUCCESS:
      return { loading: false, teams: action.payload };
    case GET_MY_TEAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const teamViewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAM_VIEW_REQUEST:
      return { loading: true };
    case GET_TEAM_VIEW_SUCCESS:
      return { loading: false, team: action.payload };
    case GET_TEAM_VIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const filterTeamsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FILTER_TEAMS_REQUEST:
      return { loading: true };
    case GET_FILTER_TEAMS_SUCCESS:
      return { loading: false, teams: action.payload };
    case GET_FILTER_TEAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
