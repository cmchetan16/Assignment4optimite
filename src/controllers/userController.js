const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const {
  isValidBody,
  isValid,
  isValidName,
  isValidPhone,
  isValidEmail,
  isValidPassword,
} = require("../utils/validation.js");

const createUse = async (req, res) => {
  try {
    let data = req.body;

    if (!isValidBody(data))
      return res
        .status(401)
        .send({ status: false, message: "Body can't be empty" });

    let { title, fname, lname, phone, email, password } = data;

    if (!isValid(title))
      return res
        .status(401)
        .send({ status: false, message: "Please enter title" });
    if (!isValid(fname))
      return res
        .status(401)
        .send({ status: false, message: "Please enter First Name" });
    if (!isValid(lname))
      return res
        .status(401)
        .send({ status: false, message: "Please enter Last Name" });
    if (!isValid(phone))
      return res
        .status(401)
        .send({ status: false, message: "Please enter Phone no." });
    if (!isValid(email))
      return res
        .status(401)
        .send({ status: false, message: "Please enter Email" });
    if (!isValid(password))
      return res
        .status(401)
        .send({ status: false, message: "Please enter Password" });

    if (!["Mr", "Mrs", "Miss"].includes(title))
      return res.status(406).send({
        status: false,
        msg: "you can use only [Mr, Mrs, Miss] in title",
      });

    if (!isValidName(fname))
      return res.status(406).send({
        status: false,
        msg: "Enter a valid name",
        validname:
          "length of fname has to be in between (3-20)  , use only String ",
      });

    if (!isValidName(lname))
      return res.status(406).send({
        status: false,
        msg: "Enter a valid name",
        validname:
          "length of lname has to be in between (3-20)  , use only String ",
      });

    if (!isValidPhone(phone))
      return res.status(406).send({
        status: false,
        message: "mobile no. is not valid",
        ValidMobile:
          "it must be 10 digit Number & it should be a indian mobile no.",
      });

    if (!isValidEmail(email))
      return res.status(406).send({
        status: false,
        msg: "email id is not valid",
        ValidMail: "email must be in for e.g. xyz@abc.com format.",
      });

    if (!isValidPassword(password))
      return res.status(406).send({
        status: false,
        message: "enter valid password  ",
        ValidPassWord:
          "passWord in between(8-15)& must be contain ==> upperCase,lowerCase,specialCharecter & Number",
      });
    password = await bcrypt.hash(password, 11);

    let uniquePhone = await userModel.findOne({ phone: phone });
    if (uniquePhone)
      return res
        .status(400)
        .send({ status: false, message: "phone no. Already Exists." });

    let uniqueEmail = await userModel.findOne({ email: email });
    if (uniqueEmail)
      return res
        .status(400)
        .send({ status: false, message: "email Id Already Exists." });

    const userData = { title, fname, lname, phone, email, password };

    let savedData = await userModel.create(userData);
    res.status(201).send({ status: true, message: "Success", data: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//////////////////////// LOGIN ///////////////////////////

const logIn = async (req, res) => {
  try {
    let data = req.body;
    const { email, password } = data;

    if (!isValid(email))
      return res
        .status(401)
        .send({ status: false, message: "Please enter Email" });
    if (!isValidEmail(email))
      return res.status(406).send({
        status: false,
        msg: "email id is not valid",
        ValidMail: "email must be in for e.g. xyz@abc.com format.",
      });

    if (!isValid(password))
      return res
        .status(401)
        .send({ status: false, message: "Please enter Password" });
    if (!isValidPassword(password))
      return res.status(406).send({
        status: false,
        message: "enter valid password  ",
        ValidPassWord:
          "passWord in between(8-15)& must be contain ==> upperCase,lowerCase,specialCharecter & Number",
      });

    let checkUser = await userModel
      .findOne({ email: email })
      .select({ _id: 1, password: 1 })
      .lean();
    if (!checkUser)
      return res
        .status(404)
        .send({ status: false, message: "Email not found" });

    let actualPassword = await bcrypt.compare(password, checkUser.password);

    if (!actualPassword)
      return res
        .status(400)
        .send({ status: false, message: "Incorrect email or password" });

    let token = jwt.sign(
      {
        userId: checkUser._id,
      },
      "assignment4opt",
      { expiresIn: "24h" }
    );

    res.setHeader("Authorization", token);
    return res
      .status(200)
      .send({
        status: true,
        message: "User loged in successfully",
        data: token,
        userId: checkUser._id,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createUse, logIn };
