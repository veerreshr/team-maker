import axios from "axios"
import {
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL
      } from "../constants/teamConstants";

export const createTeamAction = (eventName, teamName,teamDesc,languages,skills) => async (dispatch) => {
    try {
      dispatch({
        type:     CREATE_TEAM_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/teams/createteam",
        { eventname:eventName, name:teamName,desc:teamDesc,preferences:{languages,skills} },
        config
      );
  
      dispatch({
        type: CREATE_TEAM_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: CREATE_TEAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };