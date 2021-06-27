import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    languages:{
      type:Array,
      default:[],
      required: true,

  },
    skills:{
        type:Array,
        default:[],
        required: true,

    },
    about:{
    type:Array,
    default:[],
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  college: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  certification: {
    type: String,
    required: false,
  },
  teams: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Team', }]

  },
  { timestamps: true }//Gender,College,Location,
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);
export default User;
