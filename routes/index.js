const express = require('express')
const pool = require('./../model/pool');
// Callback controllers
const adsController = require('../controller/adsController');
const verifyController = require('../controller/verificationController');
const signUpController = require('../controller/signUpController');
const userLoginController = require('../controller/userLoginController');
const sellAdsController = require('../controller/sellAdsController');
const updateProfileController = require('../controller/updateProfileController');
const dashBoardController = require('../controller/dashBoardController');
const myAdsController = require('../controller/myAdsController');
const updatePasswordController = require('../controller/updatePasswordController');
const logoutController = require('../controller/logoutController');
const userForgetPasswordController = require('../controller/forgetPasswordController');
const setNewPasswordController = require('../controller/setNewPasswordController');
const forgetPasswordOtpController = require('../controller/forgetPasswordOtpController');

const router = express.Router()

function logout(req, res, next) {
  let user_session = req.session
  if (!user_session.phone) {
    res.redirect('/login')
  }
  next()
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
// for sell section
router.get('/sellsubcat', (req, res) => {
  var val = req.query.value
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
router.get('/forget_password', userForgetPasswordController.forgetPasswordGet); // end of get method

//  post method
router.post('/forget_password', userForgetPasswordController.forgetPasswordPost) // end of post method

//  Get method
router.get('/forget_password_otp', forgetPasswordOtpController.forgetPasswordOtpGet); // end of get method

//  post method
router.post('/forget_password_otp', forgetPasswordOtpController.forgetPasswordOtpPost) // end of post method

//  Get method
router.get('/forget_password_new_password', setNewPasswordController.setNewPasswordGet); // end of get method

//  post method
router.post('/forget_password_new_password', setNewPasswordController.setNewPasswordPost) // end of post method

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
router.get('/update_password', updatePasswordController.updatePasswordGet); // end of get method

// post mehtod
router.post('/update_password',updatePasswordController.updatePasswordPost); // end of post method
// ========================================= end of change password sections ===================================================

// ========================================= start donation section    ==================================================
router.get('/donation', (req, res, next) => {
  next();
})
// Logout section
router.get('/logout', logoutController.logout);  // logout route

module.exports = router;
