const pool = require('./../model/pool');
const moment = require('moment');

exports.stateGet = async(req, res, next)=>{
    try{
      const stateData = await pool.state_data.find().sort({name:1});
      res.render('admin/add_state',{stateData:stateData, moment:moment, fail:"", pass:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.statePost = async (req, res, next)=>{
    try{
      const state = (req.body.state).trim();
      const checkState = await pool.state_data.findOne({name:state});
      if(checkState){
        const stateData = await pool.state_data.find().sort({name:1});
        return res.render('admin/add_state', {stateData:stateData, moment:moment ,fail:`${state} already exited!`, pass:""});
      }
      await pool.state_data.create({
        name:state
      });
      const stateData = await pool.state_data.find().sort({name:1});
      return res.render('admin/add_state', {stateData:stateData, moment:moment ,fail:"", pass:`${state} has been inserted!`});
    }catch(e){
      console.log(e);
      next();
    }
  }