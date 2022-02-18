import path from "path";
import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

const router = express.Router();

// CREATE OBJECT FOR S3
const S3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//FOR LOCAL TESTING
const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const s3Storage = multerS3({
  s3: S3,
  acl: "public-read",
  bucket: "teammaker",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images of type jpg,jpeg,png only!");
  }
}

const upload = multer({
  storage: s3Storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({ photoURL: req.file.location });
});
// router.post("/", (req, res) => res.json("hello"));

export default router;
