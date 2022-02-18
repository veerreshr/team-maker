import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";

//@desc    getMessages - get all messages by team Id
//@route   GET /api/events/getEvents/:eventId
//@access  Public
const getMessages = expressAsyncHandler(async (req, res) => {
  try {
    if (
      req.teams?.filter((team) => team.teamId.toString() === req.params.id)
        .length > 0
    ) {
      const offset = req.query.offset || 0;
      const limit = req.query.limit || 30;
      const messages = await Chat.find({ teamId: req.params.id })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
      return res.status(200).json(messages);
    } else {
      return res.status(401).json({
        message: "You are not authorized to access this team",
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong : " + error);
  }
});

export { getMessages };
