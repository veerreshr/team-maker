import expressAsyncHandler from "express-async-handler";
import CustomEvent from "../models/customEventModel.js";

const getEvents = expressAsyncHandler(async (req, res) => {
    const events = await CustomEvent.find({});
    if(events){
    res.json(events);}
    else{
        res.status(404);
        throw new Error("Events not found");
    }
});

const addEvent = expressAsyncHandler(async (req, res) => {
    const { eventName, eventDesc, startDate } = req.body;
    const event = await CustomEvent.create({ eventName, eventDesc, startDate });
    if(event) {
        res.json({
            _id: event._id,
            name: event.eventName,
            desc: event.eventDesc,
            start: event.startDate,
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const deleteEvents = expressAsyncHandler(async (req, res) => {
    const today = new Date();
    await CustomEvent.deleteMany({ startDate : { $lte: today }})
    .then(() => {
        res.send("Outdated Orgs deleted");
    })
    .catch((err) => {
        console.error(`Operation failed due to ${err}`);
    });  
    res.json(outDated);

});

export {
    getEvents,
    addEvent,
    deleteEvents
}