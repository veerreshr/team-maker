import axios from "axios";
import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  GET_SCRAPPED_EVENTS_REQUEST,
  GET_SCRAPPED_EVENTS_SUCCESS,
  GET_SCRAPPED_EVENTS_FAIL,
} from "../constants/eventConstants";

export const getEventsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_EVENTS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/events", config);

    dispatch({
      type: GET_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getScrappedEventsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SCRAPPED_EVENTS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/events/getScrappedEvents", config);

    dispatch({
      type: GET_SCRAPPED_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SCRAPPED_EVENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
