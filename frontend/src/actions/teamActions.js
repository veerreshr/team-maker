import axios from "axios";
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

export const createTeamAction =
  (eventName, teamName, teamDesc, languages, skills, history) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_TEAM_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/teams/createteam",
        {
          eventname: eventName,
          name: teamName,
          desc: teamDesc,
          preferences: { languages, skills },
        },
        config
      );

      dispatch({
        type: CREATE_TEAM_SUCCESS,
        payload: data,
      });
      history.push("/teams");
    } catch (error) {
      dispatch({
        type: CREATE_TEAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      history.push("/teams");
    }
  };
export const myTeamsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_TEAMS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/teams/getmyteams", config);

    dispatch({
      type: GET_MY_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_TEAMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const teamViewAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TEAM_VIEW_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/teams/${id}`, config);

    dispatch({
      type: GET_TEAM_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEAM_VIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterTeamsByPreferences =
  (eventname, languages, skills) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_FILTER_TEAMS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/teams/filterbydetails`,
        { eventname, languages, skills },
        config
      );

      dispatch({
        type: GET_FILTER_TEAMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_FILTER_TEAMS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
