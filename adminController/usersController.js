const pool = require('./../model/pool');
const moment = require('moment');


exports.verifiedUsers = async(req, res, next)=> {
    try{ 
      const userData = await pool.user_data.find({user_status:1}).sort({_id:-1});
      return res.render('admin/allVerifiedUsers',{
        usersData:userData,
        moment: moment
      });
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.unVerifiedUsers = async(req, res, next)=> {
    try{ 
      const userData = await pool.user_data.find({user_status:0}).sort({_id:-1});
      return res.render('admin/test',{
        userData:userData,
        moment: moment
      });
    }catch(e){
      console.log(e);
      next();
    }
  }