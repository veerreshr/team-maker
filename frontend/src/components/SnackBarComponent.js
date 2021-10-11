import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { HIDE_SNACKBAR } from "../constants/utilConstants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBarComponent() {
  const dispatch = useDispatch();
  const { snackbar_state, type, message } = useSelector(
    (state) => state.snackbar
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: HIDE_SNACKBAR });
  };
  return (
    <Snackbar
      open={snackbar_state}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      {snackbar_state && (
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}

export default SnackBarComponent;
