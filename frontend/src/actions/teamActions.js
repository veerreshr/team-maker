import axios from "axios";
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
  SEND_REQUEST_TO_JOIN_TEAM_FAIL,
  SEND_REQUEST_TO_JOIN_TEAM_SUCCESS,
  SEND_REQUEST_TO_JOIN_TEAM_REQUEST,
  GET_TEAM_REQUESTS_REQUEST,
  GET_TEAM_REQUESTS_SUCCESS,
  GET_TEAM_REQUESTS_FAIL,
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
export const getMyTeamsAction = () => async (dispatch, getState) => {
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

    const { data } = await axios.get("/api/users/getmyteams", config);

    dispatch({
      type: GET_MY_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_MY_TEAMS_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};
export const getTeamById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TEAM_BY_ID_REQUEST,
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
      `/api/users/getteambyid?teamid=${id}`,
      config
    );

    dispatch({
      type: GET_TEAM_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_TEAM_BY_ID_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
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

export const getTeamRequests = (teamid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TEAM_REQUESTS_REQUEST,
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
      `/api/teams/getteamrequests?teamid=${teamid}`,
      config
    );

    dispatch({
      type: GET_TEAM_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_TEAM_REQUESTS_FAIL,
      payload: errorMessage,
    });
  }
};

export const handleRequests =
  ({ teamid, status, userid }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_TEAM_REQUESTS_REQUEST,
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
      await axios.post(
        `/api/teams/handlerequest`,
        {
          teamid,
          status,
          userid,
        },
        config
      );
      const { data } = await axios.get(
        `/api/teams/getteamrequests?teamid=${teamid}`,
        config
      );

      dispatch({
        type: GET_TEAM_REQUESTS_SUCCESS,
        payload: data,
      });

      toast.success("Request " + status + "ed");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_TEAM_REQUESTS_FAIL,
        payload: errorMessage,
      });
      toast.error(errorMessage);
    }
  };

export const removeMember =
  ({ teamid, userid }) =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `/api/teams/removemember?teamid=${teamid}&&userid=${userid}`,
        config
      );
      dispatch(getTeamById(teamid));
      toast.success("Member Removed");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_TEAM_REQUESTS_FAIL,
        payload: errorMessage,
      });
      toast.error(errorMessage);
    }
  };

export const editTeamDetails = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TEAM_BY_ID_REQUEST,
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

    const { data } = await axios.put(`/api/teams/editdetails`, details, config);

    dispatch({
      type: GET_TEAM_BY_ID_SUCCESS,
      payload: data,
    });

    toast.success("Team details updated");
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_TEAM_BY_ID_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const changeTeamPassword =
  (teamid, current_password, new_password) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `/api/teams/changepassword`,
        { teamid, current_password, new_password },
        config
      );
      toast.success("Password changed successfully");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(errorMessage);
    }
  };
