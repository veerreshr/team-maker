import axios from "axios"
import {
    ADD_EVENT_REQUEST,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAIL
      } from "../constants/eventConstants";

export const addEventAction = (eventName, eventDesc,startDate) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_EVENT_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/customEvents/addEvent",
        {eventName, eventDesc,startDate },
        config
      );
  
      dispatch({
        type: ADD_EVENT_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: ADD_EVENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };