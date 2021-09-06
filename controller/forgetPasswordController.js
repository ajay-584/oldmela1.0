const pool = require('../model/pool');
const helper = require('../helper/index');

exports.forgetPasswordGet = async(req, res, next)=>{
    try{
        return res.render('userForgetPassword', {user_name: '', fail:'', pass:'',});
    }catch(e){
        console.log(e);
        next();
    }
}

exports.forgetPasswordPost = async(req, res, next)=>{
    try{
        const userPhone = req.body.userPhone;
        const result = await pool.user_data.findOne({ user_mobile: userPhone });
        if(result){
            const otp = helper.otpGenerator();
            await pool.user_data.updateOne({_id:result._id},{user_otp:otp});
            await helper.otpSender(otp,result.user_mobile);
            // console.log(otp);
            return res.redirect('/forget_password_otp?id='+ String(result._id))
        }else{
            return res.render('userForgetPassword', {
                user_name: '',
                fail:`${userPhone} does not registered!`,
                pass:``,
              });
        }
    }catch(e){
        console.log(e);
        next();
    }
}




