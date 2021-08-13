const city = require('./city');
const otpSender = require('./otpSender');
const otpGenerator = require('./otpGenerator');
const imgUploader = require('./imageUploader');
const deleteImage = require('./deleteImage');
const compressAndMoveImage = require('./imageCompressor');
const pendingAds = require('./pendingAds');
const uploadFile = require('./uploadImageOnS3')


module.exports = {
    city,
    otpSender,
    otpGenerator,
    imgUploader,
    deleteImage,
    compressAndMoveImage,
    pendingAds,
    uploadFile
}