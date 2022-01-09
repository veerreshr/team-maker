import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
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
import { toast } from "react-toastify";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
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

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  //need to add team data reset
};

export const register =
  (username, name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
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

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getUserProfileDetails =
  (username) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_DETAILS_REQUEST,
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
    } catch (error) {
      dispatch({
        type: USER_PROFILE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getBasicInformation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BASIC_INFORMATION_REQUEST,
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
  } catch (error) {
    dispatch({
      type: GET_BASIC_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateBasicInformation =
  (updatedValues) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_BASIC_INFORMATION_REQUEST,
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

      const { data } = await axios.put(
        `/api/users/profile/basicinformation`,
        updatedValues,
        config
      );

      dispatch({
        type: UPDATE_BASIC_INFORMATION_SUCCESS,
      });
      dispatch({
        type: GET_BASIC_INFORMATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BASIC_INFORMATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSkills = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SKILLS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/skills?_id=${id}`,
      config
    );

    dispatch({
      type: GET_SKILLS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SKILLS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateSkills = (skills) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SKILLS_REQUEST,
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

    const { data } = await axios.put(
      `/api/users/profile/skills`,
      skills,
      config
    );
    console.log(data);
    dispatch({
      type: GET_SKILLS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SKILLS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLanguages = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_LANGUAGES_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/languages?_id=${id}`,
      config
    );

    dispatch({
      type: GET_LANGUAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LANGUAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateLanguages = (skills) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_LANGUAGES_REQUEST,
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

    const { data } = await axios.put(
      `/api/users/profile/languages`,
      skills,
      config
    );
    dispatch({
      type: GET_LANGUAGES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LANGUAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EXPERIENCE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/experience?_id=${id}`,
      config
    );

    dispatch({
      type: GET_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPERIENCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateExperience = (experience) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EXPERIENCE_REQUEST,
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

    const { data } = await axios.put(
      `/api/users/profile/experience`,
      experience,
      config
    );
    dispatch({
      type: GET_EXPERIENCE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPERIENCE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EXPERIENCE_REQUEST,
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
    const { data } = await axios.delete(
      `/api/users/profile/experience/${id}`,
      config
    );
    dispatch({
      type: GET_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPERIENCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//----------------------------------------Education---------------------------------------------

export const getEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EDUCATION_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/education?_id=${id}`,
      config
    );

    dispatch({
      type: GET_EDUCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EDUCATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEducation = (experience) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EDUCATION_REQUEST,
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

    const { data } = await axios.put(
      `/api/users/profile/education`,
      experience,
      config
    );
    dispatch({
      type: GET_EDUCATION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EDUCATION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EDUCATION_REQUEST,
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
    const { data } = await axios.delete(
      `/api/users/profile/education/${id}`,
      config
    );
    dispatch({
      type: GET_EDUCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EDUCATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//----------------------------------------Certification---------------------------------------------

export const getCertifications = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CERTIFICATION_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/certification?_id=${id}`,
      config
    );

    dispatch({
      type: GET_CERTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CERTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCertification =
  (certification) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_CERTIFICATION_REQUEST,
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

      const { data } = await axios.put(
        `/api/users/profile/certification`,
        certification,
        config
      );
      dispatch({
        type: GET_CERTIFICATION_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CERTIFICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCertification = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CERTIFICATION_REQUEST,
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
    const { data } = await axios.delete(
      `/api/users/profile/certification/${id}`,
      config
    );
    dispatch({
      type: GET_CERTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CERTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//----------------------------------------Awards and Certifications---------------------------------------------

export const getAwardsAndAchievements = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_AWARDS_AND_ACHIEVEMENTS_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/awardsandachievements?_id=${id}`,
      config
    );

    dispatch({
      type: GET_AWARDS_AND_ACHIEVEMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AWARDS_AND_ACHIEVEMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAwardsAndAchievement =
  (awardsandachievements) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_AWARDS_AND_ACHIEVEMENTS_REQUEST,
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

      const { data } = await axios.put(
        `/api/users/profile/awardsandachievements`,
        awardsandachievements,
        config
      );
      dispatch({
        type: GET_AWARDS_AND_ACHIEVEMENTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_AWARDS_AND_ACHIEVEMENTS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteAwardsAndAchievement =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_AWARDS_AND_ACHIEVEMENTS_REQUEST,
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
      const { data } = await axios.delete(
        `/api/users/profile/awardsandachievements/${id}`,
        config
      );
      dispatch({
        type: GET_AWARDS_AND_ACHIEVEMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_AWARDS_AND_ACHIEVEMENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//----------------------------------------Projects---------------------------------------------

export const getProjects = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROJECT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/users/profile/projects?_id=${id}`,
      config
    );

    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProject = (projects) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROJECT_REQUEST,
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

    const { data } = await axios.put(
      `/api/users/profile/projects`,
      projects,
      config
    );
    dispatch({
      type: GET_PROJECT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROJECT_REQUEST,
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
    const { data } = await axios.delete(
      `/api/users/profile/projects/${id}`,
      config
    );
    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//--------------------------------------Requests------------------------------------------------

export const getRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_REQUESTS_REQUEST,
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

    const { data } = await axios.get(`/api/users/getrequests`, config);

    dispatch({
      type: GET_REQUESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_REQUESTS_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const cancelRequest = (teamid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_REQUESTS_REQUEST,
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

    const { data } = await axios.delete(
      `/api/users/cancelrequest?teamid=${teamid}`,
      config
    );

    dispatch({
      type: GET_REQUESTS_SUCCESS,
      payload: data,
    });
    toast.success("Request Successfully Cancelled");
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_REQUESTS_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};
