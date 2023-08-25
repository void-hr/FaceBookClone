const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const {
	validateEmail,
	validateLength,
	validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const Post = require("../models/Post");

const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
// for password encryption
const bcrypt = require("bcrypt");
const generateCode = require("../helpers/generateCode");

exports.register = async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			email,
			password,
			username,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body;
		console.log(req.body.first_name);
		console.log(req.body);
		//check for valid email is entered
		if (!validateEmail(email)) {
			return res.status(400).json({
				message: "invalid email daala hai bhai",
			});
		}
		// check whether the entered email already exist in db
		const check = await User.findOne({ email });
		if (check) {
			return res.status(400).json({
				message: "y email phle se hi database main hai, dusra daal",
			});
		}

		if (!validateLength(first_name, 3, 30)) {
			return res.status(400).json({
				message: "phla naam must between 3 and 30 characters.",
			});
		}
		if (!validateLength(last_name, 3, 30)) {
			return res.status(400).json({
				message: "akhri naam must between 3 and 30 characters.",
			});
		}
		if (!validateLength(password, 6, 40)) {
			return res.status(400).json({
				message: "password chota daale ho be.",
			});
		}

		const cryptedPassword = await bcrypt.hash(password, 12);
		// const cryptedPassword = "12334as"

		let tempUsername = first_name + last_name;
		let newUsername = await validateUsername(tempUsername);
		const user = await new User({
			first_name,
			last_name,
			email,
			password: cryptedPassword,
			username: newUsername,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();

		const emailVerificationToken = generateToken(
			{ id: user._id.toString() },
			"30m"
		);
		console.log(emailVerificationToken);
		const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
		sendVerificationEmail(user.email, user.first_name, url);
		const token = generateToken({ id: user._id.toString() }, "7d");
		res.send({
			id: user._id,
			username: user.username,
			picture: user.picture,
			first_name: user.first_name,
			last_name: user.last_name,
			token: "token",
			verified: user.verified,
			message: "Register success! Please activate to continue further",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.activateAccount = async (req, res) => {
	try {
		const validUser = req.user.id;
		const { token } = req.body;
		const user = jwt.verify(token, process.env.TOKEN_SECRET);
		console.log(user);
		const check = await User.findById(user.id);
		if (validUser !== user.id) {
			return res.status(400).json({
				message: "you don't have the authorization to complete this operation.",
			});
		}
		if (check.verified === true) {
			return res
				.status(400)
				.json({ message: "e email to baabe phla e activated aa" });
		} else {
			await User.findByIdAndUpdate(user.id, { verified: true });
			return res
				.status(200)
				.json({ message: "apka account gets activated sucksexfully" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: "the email jo u entered is not connected to an account",
			});
		}
		const check = await bcrypt.compare(password, user.password);
		if (!check) {
			return res.status(400).json({
				message: "Invalid credentials. Kripya dobara chake",
			});
		}
		const token = generateToken({ id: user._id.toString() }, "7d");
		res.send({
			id: user._id,
			username: user.username,
			picture: user.picture,
			first_name: user.first_name,
			last_name: user.last_name,
			token: token,
			verified: user.verified,
			message: "Register success! Please activate to continue further",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.auth = (req, res) => {
	console.log(req.user);
	res.json("welcomoe to auth");
};

exports.sendVerification = async (req, res) => {
	try {
		console.log(1);
		const id = req.user.id;
		const user = await User.findById(id);
		if (user.verified === true) {
			return res.status(400).json({
				message: "This account is already activated.",
			});
		}

		const emailVerificationToken = generateToken(
			{ id: user._id.toString() },
			"30m"
		);
		const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
		sendVerificationEmail(user.email, user.first_name, url);
		return res.status(200).json({
			message: "Verification link sent.",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.findUser = async (req, res) => {
	try {
		const { email } = req.body;
		console.log("email", email);
		const user = await User.findOne({ email }).select("-password");
		if (!user) {
			return res.status(400).json({
				message: "Account does not exists.",
			});
		}
		return res.status(200).json({
			email: user.email,
			picture: user.picture,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.sendResetPasswordCode = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select("-password");
		await Code.findOneAndRemove({ user: user._id });
		const code = generateCode(5);
		const savedCode = await new Code({
			code,
			user: user._id,
		}).save();
		sendResetCode(user.email, user.first_name, code);
		return res.status(200).json({
			messsage: "Email reset code has been sent to your email",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.verifyCode = async (req, res) => {
	try {
		const { email, code } = req.body;

		const user = await User.findOne({ email });
		const userCode = await Code.findOne({ user: user._id });
		if (userCode.code === code) {
			return res.status(200).json({
				message: "Ok",
			});
		}
		return res.status(500).json({ message: "Invalid code." });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.changePassword = async (req, res) => {
	const { email, password } = req.body;
	const cryptedPassword = await bcrypt.hash(password, 12);
	await User.findOneAndUpdate(
		{ email },
		{
			password: cryptedPassword,
		}
	);
	return res.status(200).json({ message: "ok" });
};

exports.getProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const profile = await User.findOne({ username }).select("-password");
		if (!profile) {
			return res.json({ ok: false });
		}

		const posts = await Post.find({ user: profile._id }).populate("user");
		res.status(200).json({ ...profile.toObject(), posts });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
