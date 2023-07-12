const db = require("../helpers/dbconnection");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

async function Signup(data) {
  const myUuid = uuidv4();

  let Signup_details = {
    id: myUuid,
    name: data.name,
    email: data.email,
    password: data.password,
  };

  let userData = await db.login.findOne({
    attributes: ["email"],
    where: {
      email: data.email,
    },
  });

  if (userData) throw new Error("User Already Exists");
  return await db.login.create(Signup_details);
}

async function Login(data) {
  let msg = "User Not Found!";
  let userData = await db.login.findOne({
    attributes: ["id"],
    where: {
      email: data.email,
      password: data.password,
    },
  });

  if (!userData) throw new Error("Invalid Email or Password");
  return userData;
}

async function ForgotPassword(data) {
  return await db.login.findOne({
    attributes: ["email", "otp"],
    where: {
      email: data.email,
    },
  });
}

async function Updateotp(data) {
  let msg = "Failed!";
  let result = await db.login.update(
    {
      otp: data.otp,
      otpExpires: data.otpExpires,
    },
    {
      where: {
        email: data.email,
      },
    }
  );
  if (result.length > 0) {
    return "Updated Succeesfully";
  } else {
    res.status(500).send(msg);
  }
}

async function ChangePassword(data) {
  let msg = "Failed!";

  let result = await db.login.update(
    { password: data.newPassword, otp: null, otpExpires: null },
    {
      where: {
        email: data.email,
      },
    }
  );
  if (result.length > 0) {
    return "Updated Succeesfully";
  } else {
    res.status(500).send(msg);
  }
}

module.exports = {
  Signup,
  Login,
  ForgotPassword,
  Updateotp,
  ChangePassword,
};
