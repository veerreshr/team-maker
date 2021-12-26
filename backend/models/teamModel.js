import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// const { Schema } = mongoose;
// const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    password: {
      type: String,
      required: true,
    },
    events_participating: [{ type: String }],
    preferences: {
      languages: {
        type: Array,
        default: [],
        required: true,
      },
      skills: {
        type: Array,
        default: [],
        required: true,
      },
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        photo: {
          type: String,
        },
        userName: {
          type: String,
        },
        role: {
          type: String,
          enum: ["member", "admin"],
          default: "member",
        },
      },
    ],
    requests_received: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: {
          type: String,
        },
      },
    ],
    requests_sent: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

teamSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

teamSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
