import {
  SHOW_LOADING,
  HIDE_LOADING,
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
} from "./../constants/utilConstants";

export const snackbarReducer = (state = { snackbar_state: false }, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        snackbar_state: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    case HIDE_SNACKBAR:
      return { snackbar_state: false };
    default:
      return { snackbar_state: false };
  }
};

export const loadingReducer = (state = { loading_state: false }, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return { loading_state: true };
    case HIDE_LOADING:
      return { loading_state: false };
    default:
      return { loading_state: false };
  }
};
