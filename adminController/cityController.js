const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.cityGet = async(req, res, next)=>{
    try{
      const stateData = await pool.state_data.find().sort({name:1});
      const cityData = await pool.city_data.find().sort({name:1});
      return res.render('admin/add_city',{stateData, cityData, moment, fail:"", pass:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.cityPost = async (req, res, next)=>{
    try{
      const city = (req.body.city).trim();
      const checkCity = await pool.city_data.findOne({name:city});
      if(checkCity){
        const stateData = await pool.state_data.find().sort({name:1});
        const cityData = await pool.city_data.find().sort({name:1});
        return res.render('admin/add_city', {cityData,stateData, moment ,fail:`${city} is already exist!`, pass:""});
      }
      await pool.city_data.create({
        name:city,
        state_id:req.body.state_id
      });
      const stateData = await pool.state_data.find().sort({name:1});
      const cityData = await pool.city_data.find().sort({name:1});
      return res.render('admin/add_city', {cityData,stateData, moment , fail:"", pass:`${city} has been inserted!`});
    }catch(e){
      console.log(e);
      next();
    }
  }