const pool = require('./../model/pool');
const mongoose = require('mongoose');
const moment = require('moment');


exports.adsGet = async (req, res, next)=>{
    try{
      const id = mongoose.Types.ObjectId(req.query.id);
      await pool.ads_data.updateOne({_id:id},{ads_status:true});
      return res.redirect('/admin/pending_ads');
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.allApprovedAds = async(req, res, next)=> {
    try{
      const approvedAds = await pool.ads_data.find({ads_status:true}).sort({_id:-1}); 
      const userData = await pool.user_data.find();
      const city_data = await pool.city_data.find();
      return res.render('admin/allApprovedAds',{
        approvedAds:approvedAds,
        usersData:userData,
        city_data:city_data,
        moment: moment
      });
    }catch(e){
      console.log(e);
      next();
    }
  }