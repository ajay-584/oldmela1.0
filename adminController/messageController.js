const pool = require('./../model/pool');
const moment = require('moment');

exports.messageGet = async(req, res, next)=>{
    try{
      const messages = await pool.contact_data.find({status:0}).sort({_id:1});
      const readMessages = await pool.contact_data.find({status:1}).sort({_id:1});
      res.render('admin/message',{messages, readMessages, moment, fail:"", pass:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.messagePost = async (req, res, next)=>{
    try{
        const id = req.query.id;
        await pool.contact_data.updateOne({_id:id},{status:1});
        const messages = await pool.contact_data.find({status:0}).sort({_id:1});
        const readMessages = await pool.contact_data.find({status:1}).sort({_id:1});
        res.render('admin/message',{messages, readMessages, moment, fail:"", pass:""});
    }catch(e){
      console.log(e);
      next();
    }
  }