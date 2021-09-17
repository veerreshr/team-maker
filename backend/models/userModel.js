import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
      default: "https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg"
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique : true,
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
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    workTitle: {
      type: String
    },
    bio: {
      type: String,
      maxlength: 250,
    },
    toolsAndTech: [{ type: String }],
    socialLinks: {
      linkedIn: {
        type: String
      },
      twitter: {
        type: String
      },
      github: {
        type: String
      },
      medium: {
        type: String
      },
      devTo: {
        type: String
      },
      hashnode: {
        type: String
      },
      leetCode: {
        type: String
      },
      hackerRank: {
        type: String
      },
      other: {
        type: String
      }
    },
    languages: [{ type: String }],
    experience: [{
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      description: {
        type: String
      }
    }],
    education: [{
      schoolName: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      degree: {
        type: String
      },
      fieldOfStudy: {
        type: String
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      description: {
        type: String
      }
    }],
    certifications: [{
      name: {
        type: String,
        required: true
      },
      issuingOrg: {
        type: String,
        required: true
      },
      issueDate: {
        type: Date,
        required: true
      },
      expiryDate: {
        type: Date
      },
      credentialId: {
        type: String
      },
      credentialUrl: {
        type: String
      }
    }],
    achievements: [{
      title: {
        type: String,
        required: true
      },
      desc: {
        type: String
      },
      link: {
        type: String
      }
    }],
    projects: [{
      title: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      desc: {
        type: String
      },
      link: {
        type: String
      }
    }],
    teams:[{ type : mongoose.Schema.Types.ObjectId, ref: 'Team', }],
    requests:[{ type : mongoose.Schema.Types.ObjectId, ref: 'Team', }]
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
