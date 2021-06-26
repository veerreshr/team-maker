import mongoose from "mongoose";
// const { Schema } = mongoose;
// const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = mongoose.Schema(
  { 
    eventname:{
      type: String,
      required: true,      
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type:String,
      trim:true,
      required:true,
      maxlength:2000,
    },
    preferences: {
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
    },
    leader: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
    },
    members:  [{ type : mongoose.Schema.Types.ObjectId, ref: 'User', }],
    requests:[{ type : mongoose.Schema.Types.ObjectId, ref: 'User', }],

  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
