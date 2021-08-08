const pool = require('../model/pool');
const mongoose = require('mongoose');
const helper = require('../helper/index');
const bcrypt = require('bcryptjs');

exports.forgetPasswordGet = async(req, res, next)=>{
    try{
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        res.render('userForgetPassword', {
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

exports.forgetPasswordPost = async(req, res, next)=>{
    try{
        const userPhone = req.body.userPhone;
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        const result = await pool.user_data.findOne({ user_mobile: userPhone });
        if(result){
            const otp = helper.otpGenerator();
            await pool.user_data.updateOne({_id:result._id},{user_otp:otp});
            await helper.otpSender(otp,result.user_mobile);
            // console.log(otp);
            res.redirect('/forget_password_otp?id='+ String(result._id))
        }else{
            res.render('userForgetPassword', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: '',
                msg:'Given phone does not registered!'
              });
        }
    }catch(e){
        console.log(e);
        next();
    }
}

exports.forgetPasswordOtpGet = async(req, res, next)=>{
    try{
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        res.render('userForgetPasswordOtp', {
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
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        const user_data = await pool.user_data.findOne({$and:[{_id:userId},{user_otp:userOtp}]});
        if(user_data){
            res.redirect('/forget_password_new_password?id='+ String(user_data._id)+'&otp='+String(user_data.user_otp));
        }else{
            res.render('userForgetPasswordOtp', {
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



exports.forgetPasswordNewPasswordGet = async(req, res, next)=>{
    try{
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        res.render('userForgetPasswordSetNewPassword', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          flag:0
        });
    }catch(e){
        console.log(e);
        next();
    }
}

exports.forgetPasswordNewPasswordPost = async(req, res, next)=>{
    try{
        const userId = mongoose.Types.ObjectId(req.query.id);
        const userOtp = parseInt(req.query.otp);
        const new_password = req.body.new_password;
        const confirm_new_Password = req.body.confirm_new_Password;
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        if(new_password === confirm_new_Password){
            const hash_pass = bcrypt.hashSync(confirm_new_Password, 10);
            await pool.user_data.updateOne({$and:[{_id:userId},{user_otp:userOtp}]},{user_password:hash_pass});
            res.render('userForgetPasswordSetNewPassword', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: '',
                flag:1
              });
        }else{
            res.render('userForgetPasswordSetNewPassword', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: '',
                flag:2
              });
        }
    }catch(e){
        console.log(e);
        next();
    }
}