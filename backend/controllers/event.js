import expressAsyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import axios from "axios";

//@desc    getEventById
//@route   GET /api/events/getEvents/:eventId
//@access  Public

const getEventById = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId).exec();
  if (!event)
    return res.status(400).json({ error: "Event not found in the DB!" });
  return res.json(event);
});

// @desc    getEvents
// @route   GET /api/events
// @access  Public
const getEvents = expressAsyncHandler(async (req, res) => {
  const today = new Date();
  const events = await Event.find({ startDate: { $gte: today } });
  if (events) {
    res.json(events);
  } else {
    res.status(404);
    throw new Error("Events not found");
  }
});

// @desc    addEvent
// @route   POST /api/events/addEvent
// @access  Admin
const addEvent = expressAsyncHandler(async (req, res) => {
  const { name, desc, startDate, photo, url } = req.body;
  const event = await Event.create({ name, desc, startDate, photo, url });
  if (event) {
    res.json({
      _id: event._id,
      name: event.name,
      desc: event.desc,
      start: event.startDate,
      photo: event.startDate,
      url: event.url,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// @desc    updateEvent
// @route   PUT /api/events/updateEvent/:eventId
// @access  Admin

const updateEvent = expressAsyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (event) {
      await Event.findByIdAndUpdate(
        { _id: event._id },
        { $set: req.body },
        { new: true, UseFindAndModify: false, runValidators: true },
        (err, updatedEvent) => {
          if (err) {
            return res.status(400).json({
              error: `${err}`,
            });
          } else {
            res.json(updatedEvent);
          }
        }
      );
    } else {
      return res.status(404).json({
        error: "Event with this id doesn't exist",
      });
    }
  } catch (err) {
    return res.json(err.message);
  }
});

// @desc    deletePastEvents
// @route   DELETE /api/deleteEvent
// @access  Admin
const deletePastEvents = expressAsyncHandler(async (req, res) => {
  const today = new Date();
  await Event.deleteMany({ startDate: { $lte: today } })
    .then(() => {
      res.send("Outdated Events deleted !");
    })
    .catch((err) => {
      console.error(`Operation failed due to ${err}`);
    });
});

// @desc    deleteEvent
// @route   DELETE /api/events/deleteEvent/:eventId
// @access  Admin
const deleteEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (event) {
    await event.remove();
    res.json({ message: "Event was successfully deleted!" });
  } else {
    res.status(404).json({
      error: "Failed to delete this Event",
    });
  }
});

// @desc    getScrappedEvents
// @route   GET /api/events/getScrappedEvents
// @access  Public
const getScrappedEvents = expressAsyncHandler(async (req, res) => {
  try {
    const [data_one, data_two] = await Promise.all([
      axios.get("https://www.kontests.net/api/v1/hacker_earth"),
      axios.get("https://www.kontests.net/api/v1/hacker_rank"),
    ]);
    const event_one = await data_one.data;
    const event_two = await data_two.data;

    const event_one_data = await event_one.map((item) => {
      item["source"] = "HackerEarth";
      return item;
    });
    const event_two_data = await event_two.map((item) => {
      item["source"] = "HackerRank";
      return item;
    });

    const events = [...event_one_data, ...event_two_data];

    return res.json(events);
  } catch (error) {
    return res.json(error);
  }
});

export {
  getEvents,
  getEventById,
  addEvent,
  updateEvent,
  deletePastEvents,
  deleteEvent,
  getScrappedEvents,
};
