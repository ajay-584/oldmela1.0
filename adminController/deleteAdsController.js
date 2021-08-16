const pool = require('./../model/pool');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.deleteAds = async (req, res, next)=>{
    try{
      const ad_id = mongoose.Types.ObjectId(req.query.id);
      const ads_data = await pool.ads_data.findOne({_id:ad_id});
      // console.log(ads_data);
      // deleting images from image folder
      if(ads_data.ads_img1){
        await helper.deleteImage(ads_data.ads_img1);
      }
      if(ads_data.ads_img2){
        await helper.deleteImage(ads_data.ads_img2);
      }
      if(ads_data.ads_img3){
        await helper.deleteImage(ads_data.ads_img3);
      }
      // Deleting ads data from database
      if(ads_data){
        await pool.ads_data.deleteOne({_id:ads_data._id});
      }
      // console.log("images and data has been deleted");
      return res.redirect('/admin/pending_ads');
    }catch(e){
      console.log(e);
      next();
    }
  }