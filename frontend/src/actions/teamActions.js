import axios from "axios"
import {
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL,GET_TEAMS_REQUEST,GET_TEAM_SUCCESS,GET_TEAM_FAIL
      } from "../constants/teamConstants";

export const createTeamAction = (eventName, teamName,teamDesc,languages,skills,history) => async (dispatch) => {
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
      history.push('/myteams');
  
    } catch (error) {
      dispatch({
        type: CREATE_TEAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      history.push('/myteams');
    }
  };
  export const myTeams = () => async (dispatch) => {
    try {
      dispatch({
        type:     GET_TEAMS_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "api/teams/getmyteams",
        config
      );
  
      dispatch({
        type: GET_TEAM_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: GET_TEAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };