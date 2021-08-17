const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

// Fro get method
exports.allAds = async (req, res, next)=> {
    try{
      let session = req.session;
      var page = parseInt(req.query.page);
      var flag = parseInt(req.query.d);
      let size = 10;
      if(flag == 0){
        page += 1;
      }else if(flag == 1 && page >= 2){
        page -= 1;
      }else{
        page = 1
      }
      const limit = size;
      const skip = (page - 1) * size;
      const city = await pool.city_data.find().sort({name:1});
      const cat = await pool.cat_data.find().sort({name:1});
      const sub_cat = await pool.sub_cat_data.find().sort({name:1});
      const ads_data = await pool.ads_data.find({ads_status:true}).limit(limit).skip(skip).sort({_id:-1});
      // console.log(ads_data);
      return res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads_data,
        moment: moment,
        user_name: session.name,
        page:page,
        check:0
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
      var page = parseInt(req.query.page);
      var flag = parseInt(req.query.d);
      let size = 10;
      if(flag == 0){
        page += 1;
      }else if(flag == 1 && page >= 2){
        page -= 1;
      }else{
        page = 1
      }
      const limit = size;
      const skip = (page - 1) * size;
      const id = mongoose.Types.ObjectId(req.query.id);
      const city = await pool.city_data.find().sort({name:1});
      const cat = await pool.cat_data.find().sort({name:1});
      const sub_cat = await pool.sub_cat_data.find().sort({name:1});
      const ads = await pool.ads_data.find({$and:[{ads_sub_cat_id:id},{ads_status:true}]}).limit(limit).skip(skip).sort({_id:-1});
      // console.log(id,ads);
      return res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads,
        moment: moment,
        user_name: session.name,
        page:page,
        check:1,
        id:id
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
      var page = parseInt(req.query.page);
      var flag = parseInt(req.query.d);
      let size = 10;
      if(flag == 0){
        page += 1;
      }else if(flag == 1 && page >= 2){
        page -= 1;
      }else{
        page = 1
      }
      const limit = size;
      const skip = (page - 1) * size;
      const id = mongoose.Types.ObjectId(req.query.id);
      const city = await pool.city_data.find().sort({name:1});
      const cat = await pool.cat_data.find().sort({name:1});
      const sub_cat = await pool.sub_cat_data.find().sort({name:1});
      const ads = await pool.ads_data.find({$and:[{ads_city_id:id},{ads_status:true}]}).limit(limit).skip(skip).sort({_id:-1});
      // console.log(id,ads);
      return res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads,
        moment: moment,
        user_name: session.name,
        page:page,
        check:2,
        id:id
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
      const city = await pool.city_data.find().sort({name:1});
      const cat = await pool.cat_data.find().sort({name:1});
      const sub_cat = await pool.sub_cat_data.find().sort({name:1});
      const city_name = await helper.city(ads_info.ads_city_id);
      return res.render('ads_page', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_info: ads_info,
        city_name:city_name,
        user_name: session.name,
        moment: moment
      });
    } catch (err) {
      console.log(err);
      next();
    }
  }