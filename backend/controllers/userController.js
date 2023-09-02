import asyncHandler from "../middleware/asyncHandler.js";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { randomUUID } from "crypto";

// @desc    Auth use and get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Reset Users password
// @route   POST /api/users/resetpw
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const uuid = randomUUID();

    user.resetPasswordUUID = uuid;
    await user.save();

    const baseURL =
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

    const transport = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
    const mailOptions = {
      from: '"ByteShop Support" <tonysilvestri@bytecodeman.com>',
      to: email,
      subject: "Password Reset Request",
      text: "You must use must display this email as HTML.",
      html: `<p>Here is the password change link.  You have just one click on this link.</p>
             <p>If something goes wrong, you'll need to start the reset password process again.</p>
             <p><a href="${baseURL}/resetpw/${uuid}">Reset Password</a></p>`,
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }

  res.status(200).json({
    email,
    message: "Reset Password Processed",
  });
});

// @desc    Reset Users password authenticated with UUID
// @route   PUT /api/users/updatepw
// @access  Public
const updateUserPassword = asyncHandler(async (req, res) => {
  const { _id, password, resetPasswordUUID } = req.body;
  const user = await User.findById(_id);
  if (
    user &&
    user.resetPasswordUUID.toString() === resetPasswordUUID.toString()
  ) {
    user.password = password;
    user.resetPasswordUUID = undefined;
    await user.save();
    res.status(200).json({
      message: "Reset Password Processed",
    });
  } else {
    res.status(404);
    throw new Error("Error processing password change");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Create a user
// @route   POST /api/users/create
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password, isAdmin });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Cannot Create User");
  }
});

// @desc    Logout / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   Put /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   Get /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   Get /api/users/uuid/:uuid
// @access  Public
const getUserDetailsByUUID = asyncHandler(async (req, res) => {
  const uuid = req.params.uuid;
  const user = await User.findOne({ resetPasswordUUID: uuid }).select(
    "-password"
  );
  if (user) {
    //user.resetPasswordUUID = undefined;
    //await user.save();
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    //if (user.isAdmin) {
    //  res.status(400);
    //  throw new Error("Can't delete admin user");
    //}
    try {
      await User.deleteOne({ _id: id });
      res.status(201).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    try {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  resetPassword,
  registerUser,
  createUser,
  logoutUser,
  getUserProfile,
  getUserDetailsByUUID,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
