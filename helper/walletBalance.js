const unirest = require("unirest");

const walletBalance = ()=>{
    return new Promise((resolve, reject)=>{
        const req = unirest("POST", "https://www.fast2sms.com/dev/wallet");
        req.headers({
            "authorization": process.env.OTP_KEY
        });
        req.end(function (res) {
        if (res.error){
            return reject(res.error);
        }
        return resolve(res.body.wallet);
        });
    })
}

module.exports = walletBalance;