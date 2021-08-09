const pool = require('../model/pool');
const helper = require('../helper/index');

exports.forgetPasswordGet = async(req, res, next)=>{
    try{
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        return res.render('userForgetPassword', {
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
            return res.redirect('/forget_password_otp?id='+ String(result._id))
        }else{
            return res.render('userForgetPassword', {
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




