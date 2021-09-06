const pool = require('./../model/pool');
const mongoose = require('mongoose');


// for get method
exports.verifyGet = async function (req, res, next) {
    try{
      if (!req.query.hasOwnProperty('link')) {
        return res.redirect('404')
      }
      return res.render('user_verification', {
        user_name: '',
        fail:'',
        pass:''
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
        const get_otp = parseInt(req.body.otp)
        const result = await pool.user_data.findOne({ _id: num });
        // checking otp is same or not
          if (result.user_otp === get_otp) {
            // updating user status 0 to 1 means verified
            await pool.user_data.updateOne({ _id: result._id },{ user_status: 1 });
            return res.render('user_verification', {
              user_name: '',
              fail:'',
              pass: `${result.user_mobile} has been verify successfully!`,
            });
          } else {
            // when user put invalid otp
            return res.render('user_verification', {
              user_name: '',
              fail: 'Invalid otp',
              pass:``,
            })
          }
      } // end of req.qeury else statement
    }catch(e){
      console.log(e);
      next();
    }
  }