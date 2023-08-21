const express = require("express");
const {
	register,
	activateAccount,
	login,
	auth,
	sendVerification,
	findUser,
	sendResetPasswordCode,
	verifyCode,
	changePassword,
	getProfile,
} = require("../controllers/user");
const { authUser } = require("../middelwares/auth");
const { sendResetCode } = require("../helpers/mailer");
const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/auth", authUser, auth);
router.post("/sendVerification", authUser, sendVerification);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/verifyCode", verifyCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username", authUser, getProfile);
module.exports = router;
