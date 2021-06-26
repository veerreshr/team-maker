import expressAsyncHandler from "express-async-handler";
import CustomOrg from "./../models/customOrgModel.js";

const getOrgs = expressAsyncHandler(async (req, res) => {
    const orgs = await CustomOrg.find({});
    if(orgs){
    res.json(orgs);}
    else{
        res.status(404);
        throw new Error("Orgs not found");
    }
});

const addOrg = expressAsyncHandler(async (req, res) => {
    const { orgName, orgDesc, startDate } = req.body;
    const org = await CustomOrg.create({ orgName, orgDesc, startDate });
    if(org) {
        res.json({
            _id: org._id,
            name: org.orgName,
            desc: org.orgDesc,
            start: org.startDate,
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const deleteOrgs = expressAsyncHandler(async (req, res) => {
    const today = new Date();
    await CustomOrg.deleteMany({ startDate : { $lte: today }})
    .then(() => {
        res.send("Outdated Orgs deleted");
    })
    .catch((err) => {
        console.error(`Operation failed due to ${err}`);
    });  
    res.json(outDated);

});

export {
    getOrgs,
    addOrg,
    deleteOrgs
}