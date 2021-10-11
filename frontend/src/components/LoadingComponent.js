import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
function LoadingComponent() {
  const loading_data = useSelector((state) => state.loading);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading_data.loading_state}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingComponent;
