import mongoose from "mongoose";

const customOrgSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true
        },
        eventDesc: {
            type: String,
            trim: true,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        }
    },
    {timestamps: true}
);

const CustomOrg = mongoose.model('CustomOrg', customOrgSchema);
export default CustomOrg;