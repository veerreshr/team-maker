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
  deleteAwardsAndAchievement,
  getAwardsAndAchievements,
  updateAwardsAndAchievement,
} from "./../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
import LinearProgress from "@mui/material/LinearProgress";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

export default function EditAwardsAndAchievements({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.awardsAndAchievements);
  const { loading, error, awardsAndAchievements, updateSuccess, updateError } =
    data;

  const [dialogData, setDialogData] = useState({ open: false });
  const [alertData, setAlertData] = useState({ open: false, _id: null });
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [awardsAndAchievementsList, setAwardsAndAchievementsList] = useState(
    []
  );

  useEffect(() => {
    if (awardsAndAchievements) {
      setAwardsAndAchievementsList(awardsAndAchievements);
    } else {
      if (updateError || error) return;
      dispatch(getAwardsAndAchievements(id));
    }
  }, [dispatch, error, awardsAndAchievements, id, updateError]);

  const handleEdit = (_id) => {
    const selectedAwardsAndAchievement = awardsAndAchievementsList.filter(
      (e) => e._id === _id
    )[0];
    setTitle(selectedAwardsAndAchievement.title);
    setDesc(selectedAwardsAndAchievement.desc);
    setLink(selectedAwardsAndAchievement.link);
    setDialogData({
      open: true,
      _id,
      title: "Edit Award/Achievement Data",
    });
  };
  const handleClose = () => {
    setDialogData({ open: false });
  };
  const addAwardsAndAchievement = () => {
    setDialogData({
      open: true,
      _id: null,
      title: "Add New Award/Achievement",
    });
    setTitle("");
    setDesc("");
    setLink("");
  };
  const handleSave = () => {
    if (dialogData._id != null) {
      dispatch(
        updateAwardsAndAchievement({
          achievements: {
            _id: dialogData._id,
            title,
            desc,
            link,
          },
        })
      );
    } else {
      dispatch(
        updateAwardsAndAchievement({
          achievements: {
            title,
            desc,
            link,
          },
        })
      );
    }
  };
  const handleDelete = () => {
    //deleteAction to be called here
    dispatch(deleteAwardsAndAchievement(alertData._id));
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
          Awards And Achievements
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={addAwardsAndAchievement}
        >
          Add New Award/Achievement
        </Button>
      </div>

      {awardsAndAchievementsList.length > 0 &&
        awardsAndAchievementsList.map((aaData) => {
          return (
            <Card id={aaData._id} variant="outlined" sx={{ margin: "0.5em 0" }}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ fontWeight: "400" }}
                  >
                    {aaData.title}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleEdit(aaData._id);
                      }}
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        triggerDeleteAlert(aaData._id);
                      }}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </div>

                <Typography variant="body2" component="p">
                  {aaData.desc}
                </Typography>
              </CardContent>
              {aaData.link && (
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={{ pathname: aaData.link }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    link
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
            {"Successfully Updated Awards And Achievement List"}
          </Message>
        )}
        {updateError && <Message variant="error">{updateError}</Message>}
        <TextField
          value={title}
          onChange={(newValue) => setTitle(newValue.target.value)}
          label="Award/Achievement Name"
          variant="outlined"
          fullWidth
          sx={{ margin: "0.5em 0" }}
          required
        />
        <TextField
          value={desc}
          onChange={(newValue) => setDesc(newValue.target.value)}
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
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
        alertTitle="Delete this Award/Achievement?"
        alertDescription="Deleting this Award/Achievement data will lead to permanent deletion of data and you cannot restore the changes. Are you sure you want to delete ?"
      />
    </div>
  );
}
