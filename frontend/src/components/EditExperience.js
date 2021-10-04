import React, { useState } from "react";
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
import fr from "dayjs/locale/fr";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertComponent from "./AlertComponent";

export default function EditExperience() {
  const [dialogData, setDialogData] = useState({ open: false });
  const [alertData, setAlertData] = useState({ open: false });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState();
  const [companyName, setCompanyName] = useState();
  const [description, setDescription] = useState();
  let dummyData = [
    {
      _id: 1,
      title: "Software Engineer", //required
      company: "Microsoft", //required
      location: "Bangalore",
      startDate: "12/10/2021", //required
      endDate: "13/10/2021",
      description:
        "Some random description Some random description Some random description Some random description",
    },
    {
      _id: 2,
      title: "Software Engineer", //required
      company: "Microsoft", //required
      startDate: "12/10/2021", //required
      endDate: "13/10/2021",
      description:
        "Some random description Some random description Some random description Some random description",
    },
    {
      _id: 3,
      title: "Software Engineer", //required
      company: "Microsoft", //required
      startDate: "12/10/2021", //required
    },
    {
      _id: 4,
      title: "Software Engineer", //required
      company: "Microsoft", //required
      location: "Bangalore",
      startDate: "12/10/2021", //required
      description:
        "Some random description Some random description Some random description Some random description",
    },
  ];
  const handleEdit = (_id) => {
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
  };
  const handleSave = () => {
    handleClose();
  };
  const handleDelete = () => {
    //deleteAction to be called here
  };
  const alertHandleClose = () => {
    setAlertData({ open: false });
  };
  const triggerDeleteAlert = (_id) => {
    setAlertData({ open: true, _id });
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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

      {dummyData.length > 0 &&
        dummyData.map((experience) => {
          return (
            <Card variant="outlined" sx={{ margin: "0.5em 0" }}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="overline" gutterBottom>
                    {`${experience.startDate} - ${
                      experience.endDate ? experience.endDate : "present"
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
        <LocalizationProvider dateAdapter={AdapterDayJS} locale={fr}>
          <DatePicker
            mask={"__/__/____"}
            label="Start Date"
            value={startDate}
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
            mask={"__/__/____"}
            label="End Date"
            value={endDate}
            defaultValue={null}
            onChange={(newValue) => setEndDate(endDate)}
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
          onChange={(newValue) => setTitle(newValue)}
          label="Title"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={companyName}
          onChange={(newValue) => setCompanyName(newValue)}
          label="Company Name"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={description}
          onChange={(newValue) => setDescription(newValue)}
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
