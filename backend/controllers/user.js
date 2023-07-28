const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// for password encryption
const bcrypt = require("bcrypt");

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
      })
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

    const emailVerificationToken = generateToken({ id: user._id.toString() }, "30m");
    console.log(emailVerificationToken);
    const url = `${process.env.BASE_URL}activate/${emailVerificationToken}`;
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

    res.status(500).json({message: error.message })
  }
};

exports.activateAccount = async (req, res) => {
  console.log('user', req.user)
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    console.log(token)
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(user);
    const check = await User.findById(user.id);
    if(validUser !== user){
      return res
        .status(400)
        .json({
          message:
          "you don't have the authorization to complete this operation."
        })
    }
    if (check.verified === true) {
      return res.status(400).json({ message: 'e email to baabe phla e activated aa' })
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: "apka account gets activated sucksexfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

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

exports.auth = (req, res)=> {
  console.log(req.user);
  res.json('welcomoe to auth')
}