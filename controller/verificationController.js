const pool = require('./../model/pool');
const mongoose = require('mongoose');


// for get method
exports.verifyGet = async function (req, res, next) {
    try{
      if (!req.query.hasOwnProperty('link')) {
        return res.redirect('404')
      }
      const city_data = await pool.city_data.find().sort({_id:-1});
      const cat_data = await pool.cat_data.find().sort({_id:-1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({_id:-1});
      return res.render('user_verification', {
        title: 'oldmela.com',
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_name: '',
        msg: '',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }


// for post method
exports.verifyPost = async function (req, res, next) {
    try{
      let num = mongoose.Types.ObjectId(req.query.link)
      // console.log('this is query', req.query.hasOwnProperty('link'))
      if (!req.query.hasOwnProperty('link')) {
        res.redirect('404')
      } else {
        const city_data = await pool.city_data.find().sort({_id:-1});
        const cat_data = await pool.cat_data.find().sort({_id:-1});
        const sub_cat_data = await pool.sub_cat_data.find().sort({_id:-1});
        const get_otp = parseInt(req.body.otp)
        const result = await pool.user_data.findOne({ _id: num });
        // checking otp is same or not
          if (result.user_otp === get_otp) {
            // updating user status 0 to 1 means verified
            await pool.user_data.updateOne({ _id: result._id },{ user_status: 1 });
            return res.render('user_verification', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_name: '',
              msg: 'Verification successful',
            });
          } else {
            // when user put invalid otp
            return res.render('user_verification', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_name: '',
              msg: 'Invalid otp',
            })
          }
      } // end of req.qeury else statement
    }catch(e){
      console.log(e);
      next();
    }
  }