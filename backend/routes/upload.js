const express = require("express");
const { uploadImages } = require("../controllers/upload");
// const { authUser } = require("../middelwares/auth");
const imageUpload = require("../middelwares/imageUpload");

const router = express.Router();

router.post("/uploadImages", imageUpload, uploadImages);

module.exports = router;
