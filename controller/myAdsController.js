const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

const filePath = process.env.FILE_URL // There is file path of images file
exports.myAdsGet = async (req, res, next) => {
    try{
      // let id = mongoose.Types.ObjectId(req.query.id)
      let session = req.session;
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      const ads_data = await pool.ads_data.find({ user_id: user_data._id }).sort({_id:-1});
      // console.log(ads_data);
      return res.render("users/user_ads", {
        user_data,
        ads_data,
        moment,
        user_name: session.name,
      }); //end of render
    }catch(e){
      console.log(e)
      next();
    }
  }

exports.deleteMyAdsGet = async (req, res, next)=>{
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
      return res.redirect('/myAds');
    }catch(e){
      console.log(e);
      next();
    }
  }