const pool = require('../model/pool');
const moment = require('moment');

exports.usersIpGet = async(req, res, next)=>{
    try{
      const visitors = await pool.visitor_data.find().sort({_id:1});
      res.render('admin/usersIp',{visitors, moment, fail:"", pass:""});
    }catch(e){
      console.log(e);
      next();
    }
  }