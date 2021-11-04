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
  deleteProject,
  getProjects,
  updateProject,
} from "./../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

export default function EditProjects({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.projects);
  const { loading, error, projects, updateSuccess, updateError } = data;

  const [dialogData, setDialogData] = useState({ open: false });
  const [alertData, setAlertData] = useState({ open: false, _id: null });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (projects) {
      setProjectList(projects);
    } else {
      if (updateError || error) return;
      dispatch(getProjects(id));
    }
  }, [dispatch, error, projects, id, updateError]);

  const handleEdit = (_id) => {
    const selectedProject = projectList.filter((e) => e._id === _id)[0];
    setStartDate(selectedProject.startDate);
    setEndDate(selectedProject.endDate);
    setTitle(selectedProject.title);
    setDesc(selectedProject.desc);
    setLink(selectedProject.link);
    setDialogData({
      open: true,
      _id,
      title: "Edit Project",
    });
  };
  const handleClose = () => {
    setDialogData({ open: false });
  };
  const addProject = () => {
    setDialogData({
      open: true,
      _id: null,
      title: "Add New Project",
    });
    setStartDate(null);
    setEndDate(null);
    setTitle("");
    setDesc("");
    setLink("");
  };
  const handleSave = () => {
    if (dialogData._id != null) {
      dispatch(
        updateProject({
          projects: {
            _id: dialogData._id,
            title,
            desc,
            link,
            startDate,
            endDate,
          },
        })
      );
    } else {
      dispatch(
        updateProject({
          projects: {
            title,
            desc,
            link,
            startDate,
            endDate,
          },
        })
      );
    }
  };
  const handleDelete = () => {
    dispatch(deleteProject(alertData._id));
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
          Projects
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={addProject}
        >
          Add New Project
        </Button>
      </div>

      {projectList.length > 0 &&
        projectList.map((project) => {
          return (
            <Card
              id={project._id}
              variant="outlined"
              sx={{ margin: "0.5em 0" }}
            >
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="overline" gutterBottom>
                    {project.startDate.substring(0, 10)} -{" "}
                    {`${
                      project.endDate
                        ? project.endDate.substring(0, 10)
                        : "present"
                    }`}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleEdit(project._id);
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        triggerDeleteAlert(project._id);
                      }}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>

                <Typography variant="h5" component="h5">
                  {project.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {project.desc}
                </Typography>
              </CardContent>
              {project.link && (
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={{ pathname: project.link }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
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
            {"Successfully Updated Project List"}
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
          label="Project Title"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={desc}
          onChange={(newValue) => setDesc(newValue.target.value)}
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          rows={5}
          fullWidth
          sx={{ margin: "0.5em 0" }}
        />
        <TextField
          value={link}
          onChange={(newValue) => setLink(newValue.target.value)}
          label="Link"
          variant="outlined"
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
        alertTitle="Delete this Project?"
        alertDescription="Deleting this project will lead to permanent deletion of data and you cannot restore the changes. Are you sure you want to delete ?"
      />
    </div>
  );
}
