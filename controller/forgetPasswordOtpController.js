
const pool = require('../model/pool');
const mongoose = require('mongoose');

exports.forgetPasswordOtpGet = async(req, res, next)=>{
    try{
        return res.render('userForgetPasswordOtp', {
          user_name: '',
          fail:'',
          pass:'',
        });
    }catch(e){
        console.log(e);
        next();
    }
}

exports.forgetPasswordOtpPost = async(req, res, next)=>{
    try{
        const userId = mongoose.Types.ObjectId(req.query.id);
        const userOtp = req.body.userOtp;
        const user_data = await pool.user_data.findOne({$and:[{_id:userId},{user_otp:userOtp}]});
        if(user_data){
            return res.redirect('/forget_password_new_password?id='+ String(user_data._id)+'&otp='+String(user_data.user_otp));
        }else{
            return res.render('userForgetPasswordOtp', {
                user_name: '',
                fail:'Invalid Opt',
                pass:``
              });
        }
    }catch(e){
        console.log(e);
        next();
    }
}