import mongoose from "mongoose";

const customOrgSchema = mongoose.Schema(
    {
        orgName: {
            type: String,
            required: true
        },
        orgDesc: {
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