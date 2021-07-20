const unirest = require("unirest");


const otp_sender = (otp, phone)=>{
    return new Promise((resolve, reject)=>{
        const req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        req.headers({
            "authorization": process.env.OTP_KEY
          });
        req.form({
            "variables_values": otp,
            "route": "otp",
            "numbers": phone,
          }); 
        req.end((result)=>{
            if(result.error){
                // console.log(result.error);
                return reject(result.error);
            }
            // console.log(result.body);
            return resolve(result.body);
        });
    });
} 

module.exports = otp_sender;