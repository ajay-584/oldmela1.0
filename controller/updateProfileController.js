const pool = require('./../model/pool')
const mongoose = require('mongoose')

exports.updateProfileGet = async (req, res, next) => {
    try{
      let id = mongoose.Types.ObjectId(req.query.id)
      // console.log(req.query);
      let session = req.session
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      return res.render('users/user_update_profile', {
        user_data: user_data,
        user_name: session.name,
        fail: '',
        pass:'',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }


exports.updateProfilePost = async (req, res, next) => {
    try{
      // console.log(req.body);
      const name = req.body.user_name;
      const email = req.body.user_email;
      const add = req.body.user_address;
      let session = req.session
      const result = await pool.user_data.findOne({ _id: session.user_id });
      await pool.user_data.updateOne({_id:result._id}, {$set: {user_name:name, user_email:email, user_address:add}});
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      return res.render('users/user_update_profile', {
        user_data,
        user_name: session.name,
        fail:'',
        pass: 'Data has been updated',
      }); //end of render method
    }catch(e){
      console.log(e);
      next();
    }
  }