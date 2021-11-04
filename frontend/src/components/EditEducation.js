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
  deleteEducation,
  getEducation,
  updateEducation,
} from "./../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
import LinearProgress from "@mui/material/LinearProgress";

export default function EditEducation({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.education);
  const { loading, error, educationData, updateSuccess, updateError } = data;

  const [dialogData, setDialogData] = useState({ open: false });
  const [alertData, setAlertData] = useState({ open: false, _id: null });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [schoolName, setSchoolName] = useState();
  const [degree, setDegree] = useState();
  const [fieldOfStudy, setFieldOfStudy] = useState();
  const [description, setDescription] = useState();
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    if (educationData) {
      setEducationList(educationData);
    } else {
      if (updateError || error) return;
      dispatch(getEducation(id));
    }
  }, [dispatch, error, educationData, id, updateError]);

  const handleEdit = (_id) => {
    const selectedEducation = educationList.filter((e) => e._id === _id)[0];
    setStartDate(selectedEducation.startDate);
    setEndDate(selectedEducation.endDate);
    setSchoolName(selectedEducation.schoolName);
    setDegree(selectedEducation.degree);
    setFieldOfStudy(selectedEducation.fieldOfStudy);
    setDescription(selectedEducation.description);
    setDialogData({
      open: true,
      _id,
      title: "Edit Education",
    });
  };
  const handleClose = () => {
    setDialogData({ open: false });
  };
  const addEducation = () => {
    setDialogData({
      open: true,
      _id: null,
      title: "Add New Education",
    });
    setStartDate(null);
    setEndDate(null);
    setSchoolName("");
    setDegree("");
    setFieldOfStudy("");
    setDescription("");
  };
  const handleSave = () => {
    if (dialogData._id != null) {
      dispatch(
        updateEducation({
          education: {
            _id: dialogData._id,
            schoolName,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description,
          },
        })
      );
    } else {
      dispatch(
        updateEducation({
          education: {
            schoolName,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description,
          },
        })
      );
    }
  };
  const handleDelete = () => {
    //deleteAction to be called here
    dispatch(deleteEducation(alertData._id));
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
          Education
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={addEducation}
        >
          Add New Education
        </Button>
      </div>

      {educationList.length > 0 &&
        educationList.map((education) => {
          return (
            <Card
              id={education._id}
              variant="outlined"
              sx={{ margin: "0.5em 0" }}
            >
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="overline" gutterBottom>
                    {education.startDate.substring(0, 10)} -{" "}
                    {`${
                      education.endDate
                        ? education.endDate.substring(0, 10)
                        : "present"
                    }`}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleEdit(education._id);
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        triggerDeleteAlert(education._id);
                      }}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>

                <Typography variant="h5" component="h5">
                  {education.schoolName}
                </Typography>
                <Typography color="textSecondary">
                  {education.degree}{" "}
                  {education.fieldOfStudy && `, ${education.fieldOfStudy}`}
                </Typography>
                <Typography variant="body2" component="p">
                  {education.description}
                </Typography>
              </CardContent>
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
            {"Successfully Updated Education List"}
          </Message>
        )}
        {updateError && <Message variant="error">{updateError}</Message>}
        <LocalizationProvider dateAdapter={AdapterDayJS} locale={en}>
          <DatePicker
            sx={{ marginTop: "1em" }}
            label="Start Date"
            value={startDate}
            inputFormat="DD-MM-YYYY"
            defaultValue={null}
            onChange={(newValue) => setStartDate(newValue)}
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
            label="End Date"
            value={endDate}
            defaultValue={null}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => (
              <TextField
                sx={{ margin: "0.5em 0" }}
                fullWidth
                helperText="Leave empty if you are currently working there."
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          value={schoolName}
          onChange={(newValue) => setSchoolName(newValue.target.value)}
          label="School Name"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={degree}
          onChange={(newValue) => setDegree(newValue.target.value)}
          label="Degree"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
        />
        <TextField
          value={fieldOfStudy}
          onChange={(newValue) => setFieldOfStudy(newValue.target.value)}
          label="Field of Study"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
        />
        <TextField
          value={description}
          onChange={(newValue) => setDescription(newValue.target.value)}
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          rows={5}
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
        alertTitle="Delete this Education?"
        alertDescription="Deleting this educational data will lead to permanent deletion of data and you cannot restore the changes. Are you sure you want to delete ?"
      />
    </div>
  );
}
