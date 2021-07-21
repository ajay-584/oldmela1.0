const pool = require('../model/pool');
const mongoose = require('mongoose');


exports.dashBoard = async (req, res, next) => {
    try{
      let id = mongoose.Types.ObjectId(req.query.id)
      // console.log(req.query);
      let session = req.session
      // console.log(session)
      const city_data = await pool.city_data.find();
      const cat_data = await pool.cat_data.find();
      const sub_cat_data = await pool.sub_cat_data.find();
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      res.render('users/index', {
        title: 'oldmela.com',
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