import axios from "axios";
import {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_SNACKBAR,
} from "./../constants/utilConstants";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAIL,
  GET_BASIC_INFORMATION_SUCCESS,
  GET_BASIC_INFORMATION_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({
      type: HIDE_LOADING,
    });

    dispatch({
      type: SHOW_SNACKBAR,
      payload: {
        type: "success",
        message: "Login Successful",
      },
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const error_message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SHOW_SNACKBAR,
      payload: {
        type: "error",
        message: `${error_message}`,
      },
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error_message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({
    type: SHOW_SNACKBAR,
    payload: {
      type: "success",
      message: "User Logged out",
    },
  });
  //need to add team data reset
};

export const register =
  (username, name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: SHOW_LOADING,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { username, name, email, password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      dispatch({
        type: HIDE_LOADING,
      });

      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          type: "success",
          message: "Registration Successful",
        },
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const error_message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          type: "error",
          message: `${error_message}`,
        },
      });
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error_message,
      });
    }
  };

export const getUserProfileDetails =
  (username) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOW_LOADING,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/api/users/profile?username=${username}`,
        config
      );

      dispatch({
        type: USER_PROFILE_DETAILS_SUCCESS,
        payload: data,
      });
      dispatch({
        type: HIDE_LOADING,
      });
    } catch (error) {
      const error_message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          type: "error",
          message: `${error_message}`,
        },
      });
      dispatch({
        type: USER_PROFILE_DETAILS_FAIL,
        payload: error_message,
      });
    }
  };

export const getBasicInformation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOW_LOADING,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/basicinformation?_id=${id}`,
      config
    );

    dispatch({
      type: GET_BASIC_INFORMATION_SUCCESS,
      payload: data,
    });
    dispatch({
      type: HIDE_LOADING,
    });
  } catch (error) {
    const error_message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SHOW_SNACKBAR,
      payload: {
        type: "error",
        message: `${error_message}`,
      },
    });
    dispatch({
      type: GET_BASIC_INFORMATION_FAIL,
      payload: error_message,
    });
  }
};
