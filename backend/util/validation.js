var validator = require("validator");

function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(value) {
  return validator.isValidDate(value);
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

function isValidEmail(value) {
  // consider use regular expression
  // or npm install is-valid-email
  return validator.isEmail(value);
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidImageUrl = isValidImageUrl;
exports.isValidEmail = isValidEmail;
