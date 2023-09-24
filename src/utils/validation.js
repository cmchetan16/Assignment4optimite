const mongoose = require("mongoose");

const isValidBody = (value) => {
  return Object.keys(value).length > 0;
};

const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidName = (name) => {
  return /^[a-zA-Z]{3,20}$/.test(name);
};

const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const isValidTitle = (title) => {
  return /^[a-zA-Z. ]{3,20}$/.test(title);
};

const isValidDescription = (description) => {
  return /^(.|\s)*[a-zA-Z]+(.|\s)*$/.test(description);
};

const isvalidDuedate = (date) => {
  return /^(0[1-9]|[12][0-9]|3[01])(\/|-)(0[0-9]|1[1,2])(\/|-)(19|20)\d{2}$/.test(
    date
  );
};

const isValidPhone = (number) => {
  return /^[6-9][0-9]{9}$/.test(number);
};

const isValidEmail = (email) => {
  return /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(
    email
  );
};

const isValidPassword = (password) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
    password
  );
};

module.exports = {
  isValidBody,
  isValid,
  isValidName,
  isValidPhone,
  isValidEmail,
  isValidPassword,
  isValidTitle,
  isValidDescription,
  isvalidDuedate,
  isValidObjectId,
};
