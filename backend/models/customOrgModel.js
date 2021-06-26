import mongoose from "mongoose";

const customOrgSchema = mongoose.Schema(
    {
        orgName: {
            type: String,
            minlength: 8,
            required: true;
        },
        orgDesc: {
            type: String,
            minlength: 32,
            maxlength: 280,
            trim: true,
            required: true
        },
        startDate: {
            type: Date,
            required: true;
        }
    },
    {timestamps: true}
);

const CustomOrg = mongoose.model('CustomOrg', customOrgSchema);
export default CustomOrg;