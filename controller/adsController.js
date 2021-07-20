const express = require('express')
const pool = require('./../model/pool')
const uuid = require('uuid')
const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const middleware = require('../middleware/index');
const helper = require('../helper/index');

// Fro get method
exports.allAds = async (req, res, next)=> {
    try{
      let session = req.session;
      const city = await pool.city_data.find();
      const cat = await pool.cat_data.find();
      const sub_cat = await pool.sub_cat_data.find();
      const ads_data = await pool.ads_data.find({ads_status:true});
      // console.log(ads_data);
      res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads_data,
        moment: moment,
        user_name: session.name,
      });
    }catch(e){
      if(e){
        console.log(e);
        res.send("there is some error");
        next();
      }
    }
  }

//   for get method
  exports.allAdsByCatId = async (req, res, next)=>{
    try{
      let session = req.session;
      const id = mongoose.Types.ObjectId(req.query.id);
      const city = await pool.city_data.find();
      const cat = await pool.cat_data.find();
      const sub_cat = await pool.sub_cat_data.find();
      const ads = await pool.ads_data.find({$and:[{ads_sub_cat_id:id},{ads_status:true}]});
      // console.log(id,ads);
      res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads,
        moment: moment,
        user_name: session.name,
      });
    }catch(e){
      console.log("Error in cat root");
      console.log(e);
      next();
    }
  }