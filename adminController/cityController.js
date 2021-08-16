const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.cityGet = async(req, res, next)=>{
    try{
      const stateData = await pool.state_data.find().sort({name:1});
      const cityData = await pool.city_data.find().sort({name:1});
      res.render('admin/add_city',{stateData:stateData, cityData:cityData, moment:moment, msg:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.cityPost = async (req, res, next)=>{
    try{
      await pool.city_data.create({
        name:req.body.city,
        state_id:req.body.state_id
      });
      const stateData = await pool.state_data.find().sort({name:1});
      const cityData = await pool.city_data.find().sort({name:1});
      return res.render('admin/add_city', {cityData:cityData,stateData:stateData, moment:moment ,msg:'Data has been inserted!'});
    }catch(e){
      console.log(e);
      next();
    }
  }