const pool = require('../model/pool');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

exports.updatePasswordGet = async (req, res, next) => {
    try{
        let id = mongoose.Types.ObjectId(req.query.id)
        let session = req.session;
        const city_data = await pool.city_data.find().sort({_id:-1});
        const cat_data = await pool.cat_data.find().sort({_id:-1});
        const sub_cat_data = await pool.sub_cat_data.find().sort({_id:-1});
        const user_data = await pool.user_data.findOne({ _id: session.user_id });
        return res.render('users/user_change_password', {
            title: 'oldmela.com',
            city_data: city_data,
            cat_data: cat_data,
            sub_cat_data: sub_cat_data,
            user_data: user_data,
            user_name: session.name,
            msg: '',
        });
    }catch(e){
        console.log(e);
        next();
    }
  }

exports.updatePasswordPost = async (req, res) => {
    try{
        let session = req.session;
        let current_password = req.body.old_password;
        let new_password = req.body.new_password;
        let confirm_password = req.body.confirm_password;
        const city_data = await pool.city_data.find().sort({_id:-1});
        const cat_data = await pool.cat_data.find().sort({_id:-1});
        const sub_cat_data = await pool.sub_cat_data.find().sort({_id:-1});
        const result = await pool.user_data.findOne({ _id: session.user_id });
        let match = bcrypt.compareSync(current_password, result.user_password,);
        if(match){
            if(new_password === confirm_password){
                const hash_pass = bcrypt.hashSync(confirm_password, 10);
                await pool.user_data.updateOne({_id:result._id},{$set:{user_password:hash_pass}});
                return res.render('users/user_change_password', {
                    title: 'oldmela.com',
                    city_data: city_data,
                    cat_data: cat_data,
                    sub_cat_data: sub_cat_data,
                    user_data: result,
                    user_name: session.name,
                    msg: 'Password has been successfully changed',
                }); //end of render 
            }else{
                return res.render('users/user_change_password', {
                    title: 'oldmela.com',
                    city_data: city_data,
                    cat_data: cat_data,
                    sub_cat_data: sub_cat_data,
                    user_data: result,
                    user_name: session.name,
                    msg: 'Your new password and confirm password does not matched',
                }) // end of render
            } // end of if password matching statement 
        }else{
            return res.render('users/user_change_password', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_data: result,
                user_name: session.name,
                msg: 'Your current password is invalid',
            }); // end of render
        } // end of verify password statement 
    }catch(e){
        console.log(e);
        next();
    }
}