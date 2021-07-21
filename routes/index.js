const express = require('express')
const pool = require('./../model/pool');
const uuid = require('uuid')
const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const session = require('express-session')
// const middleware = require('../middleware/index');
const helper = require('../helper/index');
// Callback controllers
const adsController = require('../controller/adsController');
const verifyController = require('../controller/verificationController');
const signUpController = require('../controller/signUpController');
const userLoginController = require('../controller/userLoginController');
const sellAdsController = require('../controller/sellAdsController');
const updateProfileController = require('../controller/updateProfileController');
const dashBoardController = require('../controller/dashBoardController');
const myAdsController = require('../controller/myAdsController');

const router = express.Router()

const filePath = process.env.FILE_URL // There is file path of images file

function logout(req, res, next) {
  let user_session = req.session
  if (!user_session.phone) {
    res.redirect('/login')
  }
  next()
}

var city_data = async () => {
  let data = await pool.city_data.find({});
  // console.log(data)
  return data
}
var cat_data = async () => {
  let data = await pool.cat_data.find({})
  return data
}
var sub_cat_data = async () => {
  var data = await pool.sub_cat_data.find({})
  return data
}

/* =======================================GET home page.================================================= */
router.get('/', adsController.allAds); // end of get method

//  categories data
router.get('/cat', adsController.allAdsByCatId); // end of get method
// ========================================= end of home sections ==================================================

// ========================================= Ajax sections ==================================================
// for side bar
router.get('/subcat', (req, res) => {
  var val = mongoose.Types.ObjectId(req.query.value)
  sub_cat_data().then((data) => {
    res.render('subcatajax', { data: data, val: val })
  })
})
// for sell section
router.get('/sellsubcat', (req, res) => {
  var val = req.query.value
  console.log(val)
  sub_cat_data().then((data) => {
    var catArray = []
    for(x of data){
      if(String(x.cat_id) === val){
        // console.log(x.cat_id)
        catArray.push(x)
      }
    }
    // console.log("this is cat array:",catArray);
    res.render('users/sellsubcatajax', { data: catArray })
  })
})
// ========================================= end of ajax sections ==================================================
// ========================================= Start of main ads page sections ==================================================
router.get('/card', adsController.oneAddById); // end of get method
// ========================================= end of main ads page sections ====================================================

/* -----------------------------------------------------------------------------------------------------------------------------
                              USER SECTION IS HERE                                                                 
------------------------------------------------------------------------------------------------------------------------------- */

// ========================================= Start sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', logout, sellAdsController.sellAdsGet); // end of get method
// post method------------------------------------------------------------
router.post('/sell_ads', logout, sellAdsController.sellAdsPost); // end of post method

// ========================================= end of sell ads sections ========================================================

// ========================================= start of sign up page sections ====================================================
router.get('/sign_up', signUpController.signUpGet);

// post method
router.post('/sign_up', signUpController.signUpPost); // end of post method
// ========================================= end of sign up page sections ======================================================
/* =======================================Start of user verification root home page.================================================= */
router.get('/verification', verifyController.verifyGet); // end of get method

// post method
router.post('/verification', verifyController.verifyPost); // end of get method

// ========================================= end of user verification root sections ==================================================

// ========================================= start of user login root sections =======================================================
// get method
router.get('/login', userLoginController.loginGet); // end of get method

// post method
router.post('/login', userLoginController.loginPost); // end of get method
// ========================================= end of user login root sections ==========================================================


/* ======================================= Forget password start .================================================= */
//  Get method
router.get('/forget_password', (req, res, next) => {
  res.send('vertyhing is okey');
}) // end of get method

//  post method
router.post('/forget_password', (req, res, next) => {
}) // end of post method

// ========================================= end of forget password sections ==================================================


/* =======================================GET user home page.================================================= */
router.get('/dash_board', logout, dashBoardController.dashBoard); // end of get method

// ========================================= end of user home sections ==================================================

// ========================================= start myAds section    ==================================================
// my ads
router.get("/myAds", logout, myAdsController.myAdsGet);
// delete my ads
router.get('/deleteMyad', logout, myAdsController.deleteMyAdsGet);
// ========================================= end of myads sections ===================================================

// ========================================= start updateProfile section    ==================================================
// get method
router.get('/update_profile', logout, updateProfileController.updateProfileGet); 
// Post method
router.post('/update_profile', logout, updateProfileController.updateProfilePost);
// ========================================= end of Update Profile sections ===================================================

// ========================================= start Change password section    ==================================================
router.get('/update_password', (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.query.id)
  // console.log(req.query);
  let session = req.session
  // console.log(session)
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        pool.user_data.findOne({ _id: session.user_id }, (err, result) => {
          if (err) throw err
          // console.log(result);
          res.render('users/user_change_password', {
            title: 'oldmela.com',
            city_data: city_data,
            cat_data: cat_data,
            sub_cat_data: sub_cat_data,
            user_data: result,
            user_name: session.name,
            msg: '',
          })
        }) // end of user data
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of get method

// post mehtod
router.post('/update_password', (req, res) => {
  let session = req.session;
  let current_password = req.body.old_password;
  let new_password = req.body.new_password;
  let confirm_password = req.body.confirm_password;
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        pool.user_data.findOne({ _id: session.user_id }, (err, result) => {
          if (err) throw err
          let match = bcrypt.compareSync(current_password, result.user_password,);
          if(match){
            if(new_password === confirm_password){
              const hash_pass = bcrypt.hashSync(confirm_password, 10);
              pool.user_data.updateOne({_id:result._id},{$set:{user_password:hash_pass}},(err, rel)=>{
                if(err) throw err;
                // console.log(rel);
                res.render('users/user_change_password', {
                  title: 'oldmela.com',
                  city_data: city_data,
                  cat_data: cat_data,
                  sub_cat_data: sub_cat_data,
                  user_data: result,
                  user_name: session.name,
                  msg: 'Password has been successfully changed',
                }); //end of render 
              }) // end of update one
            }else{
              res.render('users/user_change_password', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_data: result,
                user_name: session.name,
                msg: 'Your new password and confirm password does not matched',
              }) // end of render
            } // end of if password matching statement 
          }else{
            res.render('users/user_change_password', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_data: result,
              user_name: session.name,
              msg: 'Your current password is invalid',
            }); // end of render
          } // end of verify password statement 
        }) // end of user data
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of post method
// ========================================= end of change password sections ===================================================

// ========================================= start donation section    ==================================================
router.get('/donation', (req, res, next) => {
  next();
})
// ========================================= end of donation sections ===================================================

// ========================================= start logout section    ==================================================
router.get('/logout', (req, res) => {
  req.session.destroy((err, result) => {
    if (err) throw err
    // console.log("logout ho gya", result);
  })
  res.redirect('/login');
})
// ========================================= end of logout sections ===================================================

module.exports = router
