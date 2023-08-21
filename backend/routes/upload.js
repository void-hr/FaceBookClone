const express = require("express");
const { uploadImages, listImages } = require("../controllers/upload");
// const { authUser } = require("../middelwares/auth");
const imageUpload = require("../middelwares/imageUpload");

const router = express.Router();

router.post("/uploadImages", imageUpload, uploadImages);
router.get("/listImages", listImages);

module.exports = router;
