import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_FAIL,
  GET_BASIC_INFORMATION_REQUEST,
  GET_BASIC_INFORMATION_SUCCESS,
  GET_BASIC_INFORMATION_FAIL,
  UPDATE_BASIC_INFORMATION_REQUEST,
  UPDATE_BASIC_INFORMATION_SUCCESS,
  UPDATE_BASIC_INFORMATION_FAIL,
  GET_SKILLS_REQUEST,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAIL,
  GET_SKILLS_UPDATE_SUCCESS,
  GET_LANGUAGES_REQUEST,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAIL,
  GET_LANGUAGES_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_DETAILS_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const getBasicInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BASIC_INFORMATION_REQUEST:
      return { ...state, loading: true };
    case GET_BASIC_INFORMATION_SUCCESS:
      return { loading: false, basicInformation: action.payload };
    case GET_BASIC_INFORMATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateBasicInformationReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_BASIC_INFORMATION_REQUEST:
      return { ...state, loading: true, success: false };
    case UPDATE_BASIC_INFORMATION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_BASIC_INFORMATION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSkillsReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_SKILLS_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_SKILLS_SUCCESS:
      return { loading: false, skills: action.payload, updateSuccess: false };
    case GET_SKILLS_UPDATE_SUCCESS:
      return { loading: false, updateSuccess: true, skills: action.payload };
    case GET_SKILLS_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};

export const getLanguagesReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_LANGUAGES_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_LANGUAGES_SUCCESS:
      return {
        loading: false,
        languages: action.payload,
        updateSuccess: false,
      };
    case GET_LANGUAGES_UPDATE_SUCCESS:
      return { loading: false, updateSuccess: true, languages: action.payload };
    case GET_LANGUAGES_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};
