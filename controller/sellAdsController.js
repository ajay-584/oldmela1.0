const express = require('express');
const pool = require('../model/pool');
const helper = require('../helper/index');

const filePath = process.env.FILE_URL // There is file path of images file

exports.sellAdsGet = async (req, res, next)=> {
    try{
      let session = req.session;
      const city_data = await pool.city_data.find();
      const cat_data = await pool.cat_data.find();
      const sub_cat_data = await pool.sub_cat_data.find();
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      return res.render('users/sell_ads', {
        title: 'oldmela.com',
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_data: user_data,
        user_name: session.name,
        msg: '',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.sellAdsPost = async (req, res, next) => {
    try{
      let session = req.session;
      const city_data = await pool.city_data.find();
      const cat_data = await pool.cat_data.find();
      const sub_cat_data = await pool.sub_cat_data.find();
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      //  Uploading file in public/images folder
      const img1 = await helper.imgUploader(req.files.img_1, filePath);
      const img2 = await helper.imgUploader(req.files.img_2, filePath);
      const img3 = await helper.imgUploader(req.files.img_3, filePath);
      var msg = ''
      await pool.ads_data.create(
            {
              ads_title: req.body.ads_name,
              ads_price: req.body.ads_price,
              ads_cat_id: req.body.ads_cat,
              ads_sub_cat_id: req.body.sub_ads_cat,
              ads_img1: img1,
              ads_img2: img2,
              ads_img3: img3,
              ads_description: req.body.description,
              ads_city_id: req.body.city,
              ads_phone: req.body.phone,
              ads_address: req.body.address,
              user_id: session.user_id,
        }); // end of insert data
        msg = 'The ads data has been submitted Thank you!'
        return res.render('users/sell_ads', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_data: user_data,
          user_name: session.name,
          msg: msg,
        })
    }catch(e){
      console.log(e);
      next();
    }
  }