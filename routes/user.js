// Importing required modules
const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/forgotPassword", ForgotPassword);
router.post("/verifyotp", Verifyotp);
router.post("/changePassword", ChangePassword);
router.post("/verifyLeader", verifyLeader);

//Signup API
async function Signup(req, res) {
  try {
    let result = await user.Signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

//Login API
async function Login(req, res) {
  try {
    let result = await user.Login(req.body);
    res.status(201).json(result);
  } catch (error) {
    // Do Something
    return res.status(404).json({ message: error.message });
  }
}

// Forgot Password API
async function ForgotPassword(req, res) {
  try {
    // Finding user with provided email
    const user = await user.ForgotPassword(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with provided email." });
    }
    // Generating random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Updating user with OTP and expiration time
    await user.Updateotp({
      otp: otp,
      otpExpires: Date.now() + 300000,
      email: user.email,
    });

    // Sending OTP email to user
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sairamravuri123@gmail.com",
          pass: "kebuswamigisdkol",
        },
      });

      const mailOptions = {
        from: "sairamravuri123@gmail.com",
        to: user.email,
        subject: "OTP for Password Reset",
        text: `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes. Please use it to reset your password on the website.\n`,
      };
      await transporter.sendMail(mailOptions);
      res
        .status(201)
        .json({ message: "OTP has been sent to your email address." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Verify OTP API
async function Verifyotp(req, res) {
  try {
    // Finding user with provided email
    const user = await user.ForgotPassword(req.body);

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with provided email." });
    }
    // Checking if OTP is valid and not expired
    if (user.otp !== parseInt(req.body.otp) || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }
    res.status(201).json({ message: "Otp Verified Succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

//ChangePassword API
async function ChangePassword(req, res) {
  try {
    let result = await user.ChangePassword(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function verifyLeader(req, res) {
  try {
    let result = await user.verifyLeader(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = router;
