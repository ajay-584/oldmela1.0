const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

const filePath = process.env.FILE_URL // There is file path of images file
exports.myAdsGet = async (req, res, next) => {
    try{
      // let id = mongoose.Types.ObjectId(req.query.id)
      let session = req.session;
      // console.log(session)
      const city_data = await pool.city_data.find().sort({name:1});
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      const ads_data = await pool.ads_data.find({ user_id: user_data._id });
      // console.log(ads_data);
      return res.render("users/user_ads", {
        title: "oldmela.com",
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_data: user_data,
        ads_data: ads_data,
        moment: moment,
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
      return res.redirect('/myAds');
    }catch(e){
      console.log(e);
      next();
    }
  }