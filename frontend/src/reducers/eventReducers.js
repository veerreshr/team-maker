import {
    ADD_EVENT_REQUEST,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAIL
      } from "../constants/eventConstants";
    
    export const addEventReducer = (state = {}, action) => {
        switch (action.type) {
          case ADD_EVENT_REQUEST:
            return { loading: true};
          case ADD_EVENT_SUCCESS:
            return { loading: false, newEvent: action.payload };
          case ADD_EVENT_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };