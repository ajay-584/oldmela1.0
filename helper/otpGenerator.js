const randomstring = require("randomstring");

// Generating 6 digit random no for otp
const otpGenerator = () => {
  var a = Math.floor(100000 + Math.random() * 900000)
  a = a.toString().substring(0, 6)
  a = parseInt(a)
  // console.log("Your otp is ",a);
  return a
}
module.exports = otpGenerator;