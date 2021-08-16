const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

exports.stateGet = async(req, res, next)=>{
    try{
      const stateData = await pool.state_data.find().sort({name:1});
      res.render('admin/add_state',{stateData:stateData, moment:moment, msg:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.statePost = async (req, res, next)=>{
    try{
      await pool.state_data.create({
        name:req.body.state
      });
      const stateData = await pool.state_data.find().sort({name:1});
      return res.render('admin/add_state', {stateData:stateData, moment:moment ,msg:'Data has been inserted!'});
    }catch(e){
      console.log(e);
      next();
    }
  }