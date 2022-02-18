import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    content: {
      message: {
        type: String,
        default: "",
        required: true,
      },
      mime_type: {
        type: String,
      },
      media_link: {
        type: String,
      },
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
