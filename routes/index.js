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
const loginController = require('../controller/loginController');

var router = express.Router()
var filePath = process.env.FILE_URL // There is file path of images file

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
router.get('/card', async function (req, res) {
  try {
    let session = req.session;
    const id = mongoose.Types.ObjectId(req.query.link);
    const ads_info = await pool.ads_data.findOne({_id: { $eq: id },});
    const city = await pool.city_data.find();
    const cat = await pool.cat_data.find();
    const sub_cat = await pool.sub_cat_data.find();
    const city_name = await helper.city(ads_info.ads_city_id);
    res.render('ads_page', {
      title: 'oldmela.com',
      city_data: city,
      cat_data: cat,
      sub_cat_data: sub_cat,
      ads_info: ads_info,
      city_name:city_name,
      user_name: session.name,
      moment: moment,
    });
  } catch (err) {
    res.send('Not found');
  }
}); // end of get method
// ========================================= end of main ads page sections ====================================================

/* -----------------------------------------------------------------------------------------------------------------------------
                              USER SECTION IS HERE                                                                 
------------------------------------------------------------------------------------------------------------------------------- */

// ========================================= Start sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', logout, function (req, res, next) {
  let session = req.session
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        res.render('users/sell_ads', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: session.name,
          msg: '',
        })
      }) // end of sub city
    }) // end of sub catagories
  }) // end of catagories
})
// post method------------------------------------------------------------
router.post('/sell_ads', (req, res) => {
  let session = req.session
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        //  console.log(req.body);
        // inserting ads data in collection
        var img1 = ''
        // checking images is uploaded or not
        if (req.files.img_1) {
          let extesion = req.files.img_1.mimetype
            .replace(/\//g, ' ')
            .split(' ')[1]
          img1 = uuid.v1() + '.' + extesion
          // moving image in imgae file
          req.files.img_1.mv(filePath + img1, function (err, data) {
            // cheking errr
            if (err) {
              console.log('Emp file uploaded fail')
            }
            // console.log('upladed');
          })
        } // end of img1

        var img2 = ''
        if (req.files.img_2) {
          let extesion = req.files.img_2.mimetype
            .replace(/\//g, ' ')
            .split(' ')[1]
          img2 = uuid.v1() + '.' + extesion
          req.files.img_2.mv(filePath + img2, function (err, data) {
            // cheking errr
            if (err) {
              console.log('Emp file uploaded fail')
            }
            // console.log('upladed');
          })
        } // end of img2

        var img3 = ''
        if (req.files.img_3) {
          let extesion = req.files.img_3.mimetype
            .replace(/\//g, ' ')
            .split(' ')[1]
          img3 = uuid.v1() + '.' + extesion
          req.files.img_3.mv(filePath + img3, function (err, data) {
            // cheking errr
            if (err) {
              console.log('Emp file uploaded fail')
            }
            // console.log('upladed');
          })
        } // end of img3
        var msg = ''
        pool.ads_data.create(
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
          },
          (err, data) => {
            if (err) {
              console.log('there is error in ads inserting')
              msg = 'There is someting wrong please try agian'
              res.render('users/sell_ads', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: session.name,
                msg: msg,
              })
            }
            // console.log("insert ho gya",data);
            msg = 'The ads data has been submitted Thank you!'
            res.render('users/sell_ads', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_name: session.name,
              msg: msg,
            })
          },
        ) // end of ads insert
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of post method

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
router.get('/login', loginController.loginGet); // end of get method

// post method
router.post('/login', loginController.loginPost); // end of get method
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
router.get('/dash_board', logout, async (req, res, next) => {
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
  console.log(e);
  console.log('error in dash_bard path');
  next();
}
}) // end of get method

// ========================================= end of user home sections ==================================================

// ========================================= start myAds section    ==================================================
router.get("/myAds", logout, (req, res, next) => {
  // let id = mongoose.Types.ObjectId(req.query.id)
  // console.log(req.query);
  let session = req.session;
  // console.log(session)
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        pool.user_data.findOne({ _id: session.user_id }, (err, result) => {
          if (err) throw err;
          // console.log(result);
          pool.ads_data.find({ user_id: result._id }, (err, data) => {
            // console.log(data);
            res.render("users/user_ads", {
              title: "oldmela.com",
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_data: result,
              ads_data: data,
              moment: moment,
              user_name: session.name,
            }); //end of render
          }); //end of  ads data
        }); // end of user data
      }); // end of city
    }); // end of sub catagories
  }); // end of catagories
});

router.get('/deleteMyad', logout, async (req, res)=>{
  const ad_id = mongoose.Types.ObjectId(req.query.id);
  try{
    const find_id = await pool.ads_data.findOne({_id:ad_id});
    if(find_id){
      await pool.ads_data.deleteOne({_id:find_id._id});
    }
  }catch(e){
    console.log(e);
  }
  res.redirect('/myAds');
})
// ========================================= end of myads sections ===================================================

// ========================================= start updateProfile section    ==================================================
// get method
router.get('/update_profile', logout, (req, res, next) => {
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
          res.render('users/user_update_profile', {
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
})
// Post method
router.post('/update_profile', logout, (req, res, next) => {
  // console.log(req.body);
  const name = req.body.user_name;
  const email = req.body.user_email;
  const add = req.body.user_address;
  let session = req.session
  // console.log(session)
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        pool.user_data.findOne({ _id: session.user_id }, (err, result) => {
          if (err) throw err
          pool.user_data.updateOne({_id:result._id}, {$set: {user_name:name, user_email:email, user_address:add}}, (err, rel)=>{
            if(err) throw err;
            // console.log(result);
            res.render('users/user_update_profile', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_data: result,
              user_name: session.name,
              msg: 'Data has been updated',
            }) //end of render method
          }) // end of update user
        }) // end of user data
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
})
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
