const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

// defining options
function adsCondition(session){
  let options;
  if(session.lat & session.lng){
    options = {
      ads_location:{
        $geoWithin:{
          $centerSphere:[ [session.lng, session.lat], 7/3963.2]
        }
      },
      ads_status:true
    }
  }else{
    options = {ads_status:true}
  }
  return options;
}
// pagination 
function pagination(page, flag){
  if(flag == 0){
    page += 1;
  }else if(flag == 1 && page >= 2){
    page -= 1;
  }else{
    page = 1
  }
  return page;
}
// Fro get method
exports.allAds = async (req, res, next)=> {
    try{
      let session = req.session;
      const page = pagination(parseInt(req.query.page), parseInt(req.query.d))
      const limit = 15;
      const skip = (page - 1) * limit;
      const options = adsCondition(session);
      const city_data = await pool.city_data.find().sort({name:1});
      const ads_data = await pool.ads_data.find(options).limit(limit).skip(skip).sort({_id:-1});
      // console.log(session);
      return res.render('index', {city_data, ads_data, moment, user_name: session.name, page, check:0});
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
      const page = pagination(parseInt(req.query.page), parseInt(req.query.d))
      const limit = 15;
      const skip = (page - 1) * limit;
      const options = adsCondition(session);
      const id = mongoose.Types.ObjectId(req.query.id);
      const city_data = await pool.city_data.find().sort({name:1});
      const ads = await pool.ads_data.find({$and:[{ads_sub_cat_id:id}, options]}).limit(limit).skip(skip).sort({_id:-1});
      // console.log(id,ads);
      return res.render('index', {
        city_data,
        ads_data: ads,
        moment,
        user_name: session.name,
        page,
        check:1,
        id
      });
    }catch(e){
      console.log("Error in cat root");
      console.log(e);
      next();
    }
  }

  //   all ads by search keywords
  exports.searchAds = async (req, res, next)=>{
    try{
      let session = req.session;
      const text = req.query.search;
      const options = adsCondition(session);
      const ads_data = await pool.ads_data.find({$and:[{ $text: { $search: text } }, options]}).sort({_id:-1});
      res.render('index', {
        ads_data,
        moment,
        user_name: session.name,
        check:4
      });
    }catch(e){
      console.log("Error in search page");
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
      const city_data = await pool.city_data.find().sort({name:1});
      const city_name = await helper.city(ads_info.ads_city_id);
      return res.render('ads_page', {
        city_data,
        ads_info,
        city_name,
        user_name: session.name,
        moment
      });
    } catch (err) {
      console.log(err);
      next();
    }
  }