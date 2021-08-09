const pool = require('./../model/pool')
const moment = require('moment');
const mongoose = require('mongoose');
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
      return res.render('index', {
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
      return res.render('index', {
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

  //   for get method
  exports.allAdsByCityId = async (req, res, next)=>{
    try{
      let session = req.session;
      const id = mongoose.Types.ObjectId(req.query.id);
      const city = await pool.city_data.find();
      const cat = await pool.cat_data.find();
      const sub_cat = await pool.sub_cat_data.find();
      const ads = await pool.ads_data.find({$and:[{ads_city_id:id},{ads_status:true}]});
      // console.log(id,ads);
      return res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads,
        moment: moment,
        user_name: session.name,
      });
    }catch(e){
      console.log("Error in city page");
      console.log(e);
      next();
    }
  }

  // for single add page
  exports.oneAddById = async function (req, res, next) {
    try {
      let session = req.session;
      const id = mongoose.Types.ObjectId(req.query.link);
      const ads_info = await pool.ads_data.findOne({_id: id});
      const city = await pool.city_data.find();
      const cat = await pool.cat_data.find();
      const sub_cat = await pool.sub_cat_data.find();
      const city_name = await helper.city(ads_info.ads_city_id);
      return res.render('ads_page', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_info: ads_info,
        city_name:city_name,
        user_name: session.name,
        moment: moment,
      });
    } catch (err) {
      console.log(err);
      next();
    }
  }