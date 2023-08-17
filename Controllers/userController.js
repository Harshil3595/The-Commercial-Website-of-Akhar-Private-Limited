const User = require('../models/userSchema');
const Inquiry = require('../models/inquirySchema');
const Service = require('../models/serviceSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail=require('../middlewares/sendEmail');
const crypto = require("crypto");
const sendToken=require('../middlewares/sendToken')

const registerController = async (req, res) => {
  const exitingUser = await User.findOne({ email: req.body.email });
  if (exitingUser) {
    return res.status(404).send({
      success: false,
      message: "User already exits"
    })
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;

  const user = new User(req.body);
  await user.save();
  return res.status(201).send({ success: true, message: "User Register succefully...", user });
}

const loginController = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User does not exits"
    })
  }

  const comparePassword = await bcrypt.compare(req.body.password, user.password);

  if (!comparePassword) {
    return res.status(500).send({ success: false, message: "Invalid credentials" })
  }

  const token = jwt.sign({ userId: user._id }, 'Harshil', { expiresIn: '1d' });
  return res.status(200).send({ success: true, message: "Login succesfully", token, user });
}

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ success: false, message: "User not fount" });
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/auth/password/reset/${resetToken}`;

  const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(404).send({ success: false, message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });


  if (!user) {
    return res.status(404).send({ success: false, message: "Invalid token" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(404).send({ success: false, message: "Password not match" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};



const sendEmailController = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(401).json({ success: false, message: `User with  ${req.body.email} Not found` });

  }

  const message = `Hi ${user.name} ,\n\nYour inquiry has been booked successfully. Our team will contact you shortly.\n\nThank you!\n\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Inquiry Booking Confirmation`,
      message,
    });

    res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: `Something went wrong` });
  }
};


const getCurrentuser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    return res.status(200).send({ success: true, user });
  } catch (err) {
    return res.status(500).send({ success: false, message: 'Server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersList = await User.find();

    if (!usersList || usersList.length === 0) {
      return res.status(404).send({ success: false, message: 'No users found' });
    }

    return res.status(200).send({ success: true, usersList });
  } catch (err) {
    return res.status(500).send({ success: false, message: 'Server error' });
  }
};

const getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();
    const serviceCount = await Service.countDocuments();

    return res.status(200).send({
      success: true,
      userCount,
      inquiryCount,
      serviceCount,
    });
  } catch (err) {
    return res.status(500).send({ success: false, message: 'Server error' });
  }
};

const sendStatusChangeEmailController = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ success: false, message: `User with ${req.body.email} Not found` });
  }

  const newStatus = req.body.status;
  if (!newStatus) {
    return res.status(400).json({ success: false, message: "Status is missing in the request body" });
  }

  const message = `Hi ${user.name},\n\nYour order status has been changed to "${newStatus}".\n\nThank you!\n\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Order Status Update`,
      message,
    });

    res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { registerController, loginController, getCurrentuser, getAllUsers, getStats ,sendEmailController,sendStatusChangeEmailController,forgotPassword,resetPassword}