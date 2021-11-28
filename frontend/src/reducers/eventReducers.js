import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  GET_SCRAPPED_EVENTS_REQUEST,
  GET_SCRAPPED_EVENTS_SUCCESS,
  GET_SCRAPPED_EVENTS_FAIL,
} from "../constants/eventConstants";

export const getEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { loading: true };
    case GET_EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case GET_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getScrappedEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SCRAPPED_EVENTS_REQUEST:
      return { loading: true };
    case GET_SCRAPPED_EVENTS_SUCCESS:
      return { loading: false, scrappedEvents: action.payload };
    case GET_SCRAPPED_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
