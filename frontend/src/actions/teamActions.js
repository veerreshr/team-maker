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
  GET_TEAMS_FROM_SEARCH_REQUEST,
  GET_TEAMS_FROM_SEARCH_SUCCESS,
  GET_TEAMS_FROM_SEARCH_FAIL,
  SEND_REQUEST_TO_JOIN_TEAM_FAIL,
  SEND_REQUEST_TO_JOIN_TEAM_SUCCESS,
  SEND_REQUEST_TO_JOIN_TEAM_REQUEST,
} from "../constants/teamConstants";
import { toast } from "react-toastify";

export const createTeamAction =
  (teamName, events, password) => async (dispatch, getState) => {
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
          teamName: teamName,
          events: events,
          password: password,
        },
        config
      );

      dispatch({
        type: CREATE_TEAM_SUCCESS,
        payload: data,
      });
      toast.success(`${data.name} successfully created`);
    } catch (error) {
      dispatch({
        type: CREATE_TEAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        "Error: " + error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
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

export const searchForTeamsAction = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TEAMS_FROM_SEARCH_REQUEST,
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
    const { data } = await axios.get(
      `/api/teams/searchteam?name=${name}`,
      config
    );

    dispatch({
      type: GET_TEAMS_FROM_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_TEAMS_FROM_SEARCH_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const sendRequestToJoinTeamAction =
  (teamid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEND_REQUEST_TO_JOIN_TEAM_REQUEST,
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
        "/api/teams/sendrequest",
        { teamid },
        config
      );

      dispatch({
        type: SEND_REQUEST_TO_JOIN_TEAM_SUCCESS,
        payload: data,
      });

      toast.success("Request sent successfully");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SEND_REQUEST_TO_JOIN_TEAM_FAIL,
        payload: errorMessage,
      });
      toast.error(errorMessage);
    }
  };
