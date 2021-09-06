const pool = require('../model/pool');
const mongoose = require('mongoose');
const moment = require('moment');


exports.dashBoard = async (req, res, next) => {
    try{
      let id = mongoose.Types.ObjectId(req.query.id)
      // console.log(req.query);
      let session = req.session;
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      return res.render('users/index', {
        moment,
        user_data,
        user_name: session.name,
      });
    }catch(e){
      console.log('error in dash_bard path');
      console.log(e);
      next();
    }
    }