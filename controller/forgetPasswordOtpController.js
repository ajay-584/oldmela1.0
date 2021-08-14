
const pool = require('../model/pool');
const mongoose = require('mongoose');

exports.forgetPasswordOtpGet = async(req, res, next)=>{
    try{
        const city_data = await pool.city_data.find().sort({name:1});
        const cat_data = await pool.cat_data.find().sort({name:1});
        const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
        return res.render('userForgetPasswordOtp', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          msg:''
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
        // console.log(userId,userOtp)
        const city_data = await pool.city_data.find().sort({name:1});
        const cat_data = await pool.cat_data.find().sort({name:1});
        const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
        const user_data = await pool.user_data.findOne({$and:[{_id:userId},{user_otp:userOtp}]});
        if(user_data){
            return res.redirect('/forget_password_new_password?id='+ String(user_data._id)+'&otp='+String(user_data.user_otp));
        }else{
            return res.render('userForgetPasswordOtp', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: '',
                msg:'Invalid Opt'
              });
        }
    }catch(e){
        console.log(e);
        next();
    }
}