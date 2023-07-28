const express = require("express");
const {
	register,
	activateAccount,
	login,
	auth,
	sendVerification,
} = require("../controllers/user");
const { authUser } = require("../middelwares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/auth", authUser, auth);
router.post("/sendVerification", authUser, sendVerification);

module.exports = router;
