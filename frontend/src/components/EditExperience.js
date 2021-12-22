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
  deleteExperience,
  getExperience,
  updateExperience,
} from "./../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
import LinearProgress from "@mui/material/LinearProgress";

export default function EditExperience({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.experience);
  const { loading, error, experiences, updateSuccess, updateError } = data;

  const [dialogData, setDialogData] = useState({ open: false });
  const [alertData, setAlertData] = useState({ open: false, _id: null });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState();
  const [companyName, setCompanyName] = useState();
  const [description, setDescription] = useState();
  const [experienceList, setExperienceList] = useState([]);

  useEffect(() => {
    if (experiences) {
      setExperienceList(experiences);
    } else {
      if (updateError || error) return;
      dispatch(getExperience(id));
    }
  }, [dispatch, error, experiences, id, updateError]);

  const handleEdit = (_id) => {
    const selectedExperience = experienceList.filter((e) => e._id === _id)[0];
    setStartDate(selectedExperience.startDate);
    setEndDate(selectedExperience.endDate);
    setTitle(selectedExperience.title);
    setCompanyName(selectedExperience.company);
    setDescription(selectedExperience.description);
    setDialogData({
      open: true,
      _id,
      title: "Edit Experience",
    });
  };
  const handleClose = () => {
    setDialogData({ open: false });
  };
  const addExperience = () => {
    setDialogData({
      open: true,
      _id: null,
      title: "Add New Experience",
    });
    setStartDate(null);
    setEndDate(null);
    setTitle("");
    setCompanyName("");
    setDescription("");
  };
  const handleSave = () => {
    if (dialogData._id != null) {
      dispatch(
        updateExperience({
          experience: {
            _id: dialogData._id,
            title,
            company: companyName,
            startDate,
            endDate,
            description,
          },
        })
      );
    } else {
      dispatch(
        updateExperience({
          experience: {
            title,
            company: companyName,
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
    dispatch(deleteExperience(alertData._id));
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
          Experience
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={addExperience}
        >
          Add New Experience
        </Button>
      </div>

      {experienceList.length > 0 &&
        experienceList.map((experience) => {
          return (
            <Card
              id={experience._id}
              variant="outlined"
              sx={{ margin: "0.5em 0" }}
            >
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="overline" gutterBottom>
                    {`${experience.startDate.substring(0, 10)} - ${
                      experience.endDate
                        ? experience.endDate.substring(0, 10)
                        : "present"
                    }`}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleEdit(experience._id);
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        triggerDeleteAlert(experience._id);
                      }}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>
                <Typography variant="h5" component="h5">
                  {experience.title}
                </Typography>
                <Typography color="textSecondary">
                  {experience.company}
                  {experience.location && ", " + experience.location}
                </Typography>
                <Typography variant="body2" component="p">
                  {experience.description}
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
            {"Successfully Updated Experience List"}
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
          value={title}
          onChange={(newValue) => setTitle(newValue.target.value)}
          label="Title"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={companyName}
          onChange={(newValue) => setCompanyName(newValue.target.value)}
          label="Company Name"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
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
        alertTitle="Delete this Experience?"
        alertDescription="Deleting this experience will lead to permanent deletion of data and you cannot restore the changes. Are you sure you want to delete ?"
      />
    </div>
  );
}
