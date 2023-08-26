const express = require("express");
const { uploadImages, listImages } = require("../controllers/upload");
const { authUser } = require("../middelwares/auth");
// const { authUser } = require("../middelwares/auth");
const imageUpload = require("../middelwares/imageUpload");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/listImages", authUser, listImages);

module.exports = router;
