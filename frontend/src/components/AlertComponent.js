import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AlertComponent({
  open,
  handleClose,
  handleConfirm,
  confirmText,
  confirmButtonColor,
  alertTitle,
  alertDescription,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alertDescription}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus color={confirmButtonColor}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default React.memo(AlertComponent);
