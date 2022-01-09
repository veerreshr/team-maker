import {
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  GET_MY_TEAMS_REQUEST,
  GET_MY_TEAMS_SUCCESS,
  GET_MY_TEAMS_FAIL,
  GET_TEAM_BY_ID_REQUEST,
  GET_TEAM_BY_ID_SUCCESS,
  GET_TEAM_BY_ID_FAIL,
  GET_FILTER_TEAMS_REQUEST,
  GET_FILTER_TEAMS_SUCCESS,
  GET_FILTER_TEAMS_FAIL,
  GET_TEAMS_FROM_SEARCH_REQUEST,
  GET_TEAMS_FROM_SEARCH_SUCCESS,
  GET_TEAMS_FROM_SEARCH_FAIL,
  SEND_REQUEST_TO_JOIN_TEAM_REQUEST,
  SEND_REQUEST_TO_JOIN_TEAM_SUCCESS,
  SEND_REQUEST_TO_JOIN_TEAM_FAIL,
  GET_TEAM_REQUESTS_REQUEST,
  GET_TEAM_REQUESTS_SUCCESS,
  GET_TEAM_REQUESTS_FAIL,
  CHANGE_TEAM_PASSWORD_REQUEST,
  CHANGE_TEAM_PASSWORD_SUCCESS,
  CHANGE_TEAM_PASSWORD_FAIL,
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
export const getTeamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAM_BY_ID_REQUEST:
      return { loading: true };
    case GET_TEAM_BY_ID_SUCCESS:
      return { loading: false, team: action.payload };
    case GET_TEAM_BY_ID_FAIL:
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

export const searchForTeamsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAMS_FROM_SEARCH_REQUEST:
      return { loading: true };
    case GET_TEAMS_FROM_SEARCH_SUCCESS:
      return { loading: false, teams: action.payload };
    case GET_TEAMS_FROM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sendRequestToJoinTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_REQUEST_TO_JOIN_TEAM_REQUEST:
      return { loading: true };
    case SEND_REQUEST_TO_JOIN_TEAM_SUCCESS:
      return { loading: false, teams: action.payload };
    case SEND_REQUEST_TO_JOIN_TEAM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTeamRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TEAM_REQUESTS_REQUEST:
      return { loading: true };
    case GET_TEAM_REQUESTS_SUCCESS:
      return { loading: false, requests: action.payload };
    case GET_TEAM_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
