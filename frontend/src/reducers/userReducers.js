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
  GET_EXPERIENCE_REQUEST,
  GET_EXPERIENCE_SUCCESS,
  GET_EXPERIENCE_FAIL,
  GET_EXPERIENCE_UPDATE_SUCCESS,
  GET_EXPERIENCE_UPDATE_FAIL,
  GET_EDUCATION_REQUEST,
  GET_EDUCATION_SUCCESS,
  GET_EDUCATION_FAIL,
  GET_EDUCATION_UPDATE_SUCCESS,
  GET_EDUCATION_UPDATE_FAIL,
  GET_CERTIFICATION_REQUEST,
  GET_CERTIFICATION_SUCCESS,
  GET_CERTIFICATION_FAIL,
  GET_CERTIFICATION_UPDATE_SUCCESS,
  GET_CERTIFICATION_UPDATE_FAIL,
  GET_AWARDS_AND_ACHIEVEMENTS_REQUEST,
  GET_AWARDS_AND_ACHIEVEMENTS_SUCCESS,
  GET_AWARDS_AND_ACHIEVEMENTS_FAIL,
  GET_AWARDS_AND_ACHIEVEMENTS_UPDATE_SUCCESS,
  GET_AWARDS_AND_ACHIEVEMENTS_UPDATE_FAIL,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  GET_PROJECT_UPDATE_SUCCESS,
  GET_PROJECT_UPDATE_FAIL,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAIL,
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

export const getExperienceReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_EXPERIENCE_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_EXPERIENCE_SUCCESS:
      return {
        loading: false,
        experiences: action.payload,
        updateSuccess: false,
      };
    case GET_EXPERIENCE_UPDATE_SUCCESS:
      return {
        loading: false,
        experiences: action.payload,
        updateSuccess: true,
      };

    case GET_EXPERIENCE_UPDATE_FAIL:
      return {
        loading: false,
        updateError: action.payload,
        updateSuccess: false,
      };
    case GET_EXPERIENCE_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};

export const getEducationReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_EDUCATION_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_EDUCATION_SUCCESS:
      return {
        loading: false,
        educationData: action.payload,
        updateSuccess: false,
      };
    case GET_EDUCATION_UPDATE_SUCCESS:
      return {
        loading: false,
        educationData: action.payload,
        updateSuccess: true,
      };

    case GET_EDUCATION_UPDATE_FAIL:
      return {
        loading: false,
        updateError: action.payload,
        updateSuccess: false,
      };
    case GET_EDUCATION_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};

export const getCertificationReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_CERTIFICATION_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_CERTIFICATION_SUCCESS:
      return {
        loading: false,
        certifications: action.payload,
        updateSuccess: false,
      };
    case GET_CERTIFICATION_UPDATE_SUCCESS:
      return {
        loading: false,
        certifications: action.payload,
        updateSuccess: true,
      };

    case GET_CERTIFICATION_UPDATE_FAIL:
      return {
        loading: false,
        updateError: action.payload,
        updateSuccess: false,
      };
    case GET_CERTIFICATION_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};

export const getAwardsAndCertificationsReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_AWARDS_AND_ACHIEVEMENTS_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_AWARDS_AND_ACHIEVEMENTS_SUCCESS:
      return {
        loading: false,
        awardsAndAchievements: action.payload,
        updateSuccess: false,
      };
    case GET_AWARDS_AND_ACHIEVEMENTS_UPDATE_SUCCESS:
      return {
        loading: false,
        awardsAndAchievements: action.payload,
        updateSuccess: true,
      };

    case GET_AWARDS_AND_ACHIEVEMENTS_UPDATE_FAIL:
      return {
        loading: false,
        updateError: action.payload,
        updateSuccess: false,
      };
    case GET_AWARDS_AND_ACHIEVEMENTS_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};

export const getProjectsReducer = (
  state = { loading: false, updateSuccess: false },
  action
) => {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
      return { ...state, loading: true, updateSuccess: false };
    case GET_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
        updateSuccess: false,
      };
    case GET_PROJECT_UPDATE_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
        updateSuccess: true,
      };

    case GET_PROJECT_UPDATE_FAIL:
      return {
        loading: false,
        updateError: action.payload,
        updateSuccess: false,
      };
    case GET_PROJECT_FAIL:
      return { loading: false, error: action.payload, updateSuccess: false };
    default:
      return state;
  }
};

export const getRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return { loading: true };
    case GET_REQUESTS_SUCCESS:
      return { loading: false, requests: action.payload };
    case GET_REQUESTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
