import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_FAIL,
  GET_BASIC_INFORMATION_SUCCESS,
  GET_BASIC_INFORMATION_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_SUCCESS:
      return { profile: action.payload };
    case USER_PROFILE_DETAILS_FAIL:
      return { error: action.payload };
    case USER_PROFILE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const getBasicInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BASIC_INFORMATION_SUCCESS:
      return { basicInformation: action.payload };
    case GET_BASIC_INFORMATION_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
