const pool = require('../model/pool');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

exports.setNewPasswordGet = async(req, res, next)=>{
    try{
        res.render('userForgetPasswordSetNewPassword', {
          user_name: '',
          flag:0
        });
    }catch(e){
        console.log(e);
        next();
    }
}

exports.setNewPasswordPost = async(req, res, next)=>{
    try{
        const userId = mongoose.Types.ObjectId(req.query.id);
        const userOtp = parseInt(req.query.otp);
        const new_password = req.body.new_password;
        const confirm_new_Password = req.body.confirm_new_Password;
        if(new_password === confirm_new_Password){
            const hash_pass = bcrypt.hashSync(confirm_new_Password, 10);
            await pool.user_data.updateOne({$and:[{_id:userId},{user_otp:userOtp}]},{$set:{user_password:hash_pass, user_status:1}});
            res.render('userForgetPasswordSetNewPassword', {
                user_name: '',
                flag:1
              });
        }else{
            res.render('userForgetPasswordSetNewPassword', {
                user_name: '',
                flag:2
              });
        }
    }catch(e){
        console.log(e);
        next();
    }
}