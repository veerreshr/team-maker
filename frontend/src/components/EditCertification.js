import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DialogComponent from "./DialogComponent";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayJS from "@mui/lab/AdapterDayjs";
import en from "dayjs/locale/en-in";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertComponent from "./AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCertification,
  getCertifications,
  updateCertification,
} from "./../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

export default function EditCertification({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.certification);
  const { loading, error, certifications, updateSuccess, updateError } = data;

  const [dialogData, setDialogData] = useState({ open: false });
  const [alertData, setAlertData] = useState({ open: false, _id: null });
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [name, setName] = useState();
  const [issuingOrg, setIssuingOrg] = useState();
  const [credentialId, setCredentialId] = useState();
  const [credentialUrl, setCredentialUrl] = useState();
  const [certificationList, setCertificationList] = useState([]);

  useEffect(() => {
    if (certifications) {
      setCertificationList(certifications);
    } else {
      if (updateError || error) return;
      dispatch(getCertifications(id));
    }
  }, [dispatch, error, certifications, id, updateError]);

  const handleEdit = (_id) => {
    const selectedCertification = certificationList.filter(
      (e) => e._id === _id
    )[0];
    setIssueDate(selectedCertification.issueDate);
    setExpiryDate(selectedCertification.expiryDate);
    setName(selectedCertification.name);
    setIssuingOrg(selectedCertification.issuingOrg);
    setCredentialId(selectedCertification.credentialId);
    setCredentialUrl(selectedCertification.credentialUrl);
    setDialogData({
      open: true,
      _id,
      title: "Edit Certification",
    });
  };
  const handleClose = () => {
    setDialogData({ open: false });
  };
  const addCertification = () => {
    setDialogData({
      open: true,
      _id: null,
      title: "Add New Certification",
    });
    setIssueDate(null);
    setExpiryDate(null);
    setName("");
    setIssuingOrg("");
    setCredentialId("");
    setCredentialUrl("");
  };
  const handleSave = () => {
    if (dialogData._id != null) {
      dispatch(
        updateCertification({
          certifications: {
            _id: dialogData._id,
            name,
            issuingOrg,
            issueDate,
            expiryDate,
            credentialId,
            credentialUrl,
          },
        })
      );
    } else {
      dispatch(
        updateCertification({
          certifications: {
            name,
            issuingOrg,
            issueDate,
            expiryDate,
            credentialId,
            credentialUrl,
          },
        })
      );
    }
  };
  const handleDelete = () => {
    //deleteAction to be called here
    dispatch(deleteCertification(alertData._id));
    setAlertData({ open: false });
  };
  const alertHandleClose = () => {
    setAlertData({ open: false });
  };
  const triggerDeleteAlert = (_id) => {
    setAlertData({ open: true, _id });
  };

  return (
    <div>
      <Loader loading={loading} />
      {error && <Message variant="error">{error}</Message>}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
        <Typography variant="h5" gutterBottom style={{ padding: "0 0.5em" }}>
          Certification
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={addCertification}
        >
          Add New Certification
        </Button>
      </div>

      {certificationList.length > 0 &&
        certificationList.map((cert) => {
          return (
            <Card id={cert._id} variant="outlined" sx={{ margin: "0.5em 0" }}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="overline" gutterBottom>
                    {cert.issueDate.substring(0, 10)} -{" "}
                    {`${
                      cert.expiryDate
                        ? cert.expiryDate.substring(0, 10)
                        : "present"
                    }`}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleEdit(cert._id);
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        triggerDeleteAlert(cert._id);
                      }}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>

                <Typography variant="h5" component="h5">
                  {cert.name}
                </Typography>
                <Typography color="textSecondary">{cert.issuingOrg}</Typography>
                <Typography color="textSecondary">
                  {cert.credentialId && `Credential Id : ${cert.credentialId}`}
                </Typography>
              </CardContent>
              {cert.credentialUrl && (
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={{ pathname: cert.credentialUrl }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certification
                  </Button>
                </CardActions>
              )}
            </Card>
          );
        })}
      <DialogComponent
        handleClose={handleClose}
        open={dialogData.open}
        title={dialogData.title}
        handleSave={handleSave}
      >
        {loading && <LinearProgress />}
        {updateSuccess && (
          <Message variant="success">
            {"Successfully Updated Certification List"}
          </Message>
        )}
        {updateError && <Message variant="error">{updateError}</Message>}
        <LocalizationProvider dateAdapter={AdapterDayJS} locale={en}>
          <DatePicker
            sx={{ marginTop: "1em" }}
            label="Issue Date"
            value={issueDate}
            inputFormat="DD-MM-YYYY"
            defaultValue={null}
            onChange={(newValue) => setIssueDate(newValue)}
            renderInput={(params) => (
              <TextField
                sx={{ margin: "0.5em 0" }}
                fullWidth
                required
                {...params}
              />
            )}
          />
          <DatePicker
            inputFormat="DD-MM-YYYY"
            label="Expiry Date"
            value={expiryDate}
            defaultValue={null}
            onChange={(newValue) => setExpiryDate(newValue)}
            renderInput={(params) => (
              <TextField
                sx={{ margin: "0.5em 0" }}
                fullWidth
                helperText="Leave empty if there is no expiry date."
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          value={name}
          onChange={(newValue) => setName(newValue.target.value)}
          label="Certification Name"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={issuingOrg}
          onChange={(newValue) => setIssuingOrg(newValue.target.value)}
          label="Issuing Organisation"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={credentialId}
          onChange={(newValue) => setCredentialId(newValue.target.value)}
          label="Credential Id"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
        />
        <TextField
          value={credentialUrl}
          onChange={(newValue) => setCredentialUrl(newValue.target.value)}
          id="outlined-multiline-flexible"
          label="Credential Url"
          fullWidth
          sx={{ margin: "0.5em 0" }}
        />
      </DialogComponent>
      <AlertComponent
        open={alertData.open}
        handleClose={alertHandleClose}
        handleConfirm={handleDelete}
        confirmText="Delete"
        confirmButtonColor="error"
        alertTitle="Delete this Certification?"
        alertDescription="Deleting this certification data will lead to permanent deletion of data and you cannot restore the changes. Are you sure you want to delete ?"
      />
    </div>
  );
}
