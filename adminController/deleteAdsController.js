const pool = require('./../model/pool');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.deleteAds = async (req, res, next)=>{
    try{
      const ad_id = mongoose.Types.ObjectId(req.query.id);
      const ads_data = await pool.ads_data.findOne({_id:ad_id});
      if(ads_data){
        // delete images form aws s3 buckets
        for(img of ads_data.ads_img){
          // console.log(img);
          await helper.deleteImage(img);
        }
        // Delete data form database 
        await pool.ads_data.deleteOne({_id:ads_data._id});
      }
      return res.redirect('/admin/pending_ads');
    }catch(e){
      console.log(e);
      next();
    }
  }