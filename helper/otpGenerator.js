const randomstring = require("randomstring");

// Generating 6 digit random no for otp
const otpGenerator = () => {
  const a = randomstring.generate({
  length: 6,
  charset: 'numeric'
  });
  // console.log("Your otp is ",parseInt(a));
  return parseInt(a);
}
module.exports = otpGenerator;