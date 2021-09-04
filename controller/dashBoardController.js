const pool = require('../model/pool');
const mongoose = require('mongoose');
const moment = require('moment');


exports.dashBoard = async (req, res, next) => {
    try{
      let id = mongoose.Types.ObjectId(req.query.id)
      // console.log(req.query);
      let session = req.session
      // console.log(session)
      const city_data = await pool.city_data.find().sort({name:1});
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      return res.render('users/index', {
        moment,
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_data: user_data,
        user_name: session.name,
      });
    }catch(e){
      console.log('error in dash_bard path');
      console.log(e);
      next();
    }
    }