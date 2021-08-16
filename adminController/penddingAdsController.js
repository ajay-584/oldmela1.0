const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.adsGet = async (req, res, next)=>{
    try{
      const pendingAds = await helper.pendingAds();
      return res.render('admin/pendingAds', {ads_data:pendingAds, moment: moment});
    }catch(e){
      console.log(e);
      next();
    }
  }