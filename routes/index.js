const express = require('express')
const pool = require('./../model/pool')
const uuid = require('uuid')
const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { query } = require('express')
const session = require('express-session')
const { myAds } = require('./userHelper')

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
  let data = await pool.city_data.find({})
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
// Generating 4 digit random no for otp
var otp = () => {
  var a = Math.floor(100000 + Math.random() * 900000)
  a = a.toString().substring(0, 4)
  a = parseInt(a)
  // console.log("Your otp is ",a);
  return a
}

/* =======================================GET home page.================================================= */
router.get('/', async function (req, res, next) {
  let session = req.session
  // console.log(session.user_id);
  var ads_data = await pool.ads_data.find()
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        // console.log(city_data);
        res.render('index', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          ads_data: ads_data,
          moment: moment,
          user_name: session.name,
        })
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of get method
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
    var ads_info = await pool.ads_data.findOne({
      _id: { $eq: mongoose.Types.ObjectId(req.query.link) },
    })
    // console.log(ads_info);
  } catch (err) {
    if (err) throw err
  }
  // console.log(req.query.link);
  cat_data().then((cat_data) => {
    let session = req.session
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        res.render('ads_page', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          ads_info: ads_info,
          user_name: session.name,
          moment: moment,
        })
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
})
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
router.get('/sign_up', (req, res) => {
  let session = req.session
  if (session.phone) {
    res.redirect('404')
  }
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        res.render('user_sign_up', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          msg: '',
        })
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
})
// post method
router.post('/sign_up', (req, res) => {
  let new_otp = otp()
  // console.log(new_otp);
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        // Checking password and confirm password is same or not?
        if (req.body.password === req.body.confirmPassword) {
          pool.user_data.find(
            { user_mobile: parseInt(req.body.mobile) },
            (err, result) => {
              if (err) throw err
              // Checking mobile nuber already exit or not?
              if (result.length < 1) {
                const hash_pass = bcrypt.hashSync(req.body.password, 10)
                pool.user_data.create(
                  {
                    user_mobile: req.body.mobile,
                    user_name: req.body.name,
                    user_password: hash_pass,
                    user_otp: new_otp,
                  },
                  (err, result) => {
                    if (err) throw err
                    res.redirect('/verification?link=' + String(result._id))
                  },
                ) // end of create data
              } else {
                res.render('user_sign_up', {
                  title: 'oldmela.com',
                  city_data: city_data,
                  cat_data: cat_data,
                  sub_cat_data: sub_cat_data,
                  user_name: '',
                  msg: 'Mobile number is already registered.',
                })
              }
            },
          ) // end of find data
        } else {
          res.render('user_sign_up', {
            title: 'oldmela.com',
            city_data: city_data,
            cat_data: cat_data,
            sub_cat_data: sub_cat_data,
            user_name: '',
            msg: 'Confirm password does not matched!',
          })
        }
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of post method
// ========================================= end of sign up page sections ======================================================
/* =======================================Start of user verification root home page.================================================= */
router.get('/verification', async function (req, res, next) {
  if (!req.query.hasOwnProperty('link')) {
    res.redirect('404')
  }
  // console.log(req.query);
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        res.render('user_verification', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          msg: '',
        })
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of get method

// post method
router.post('/verification', async function (req, res, next) {
  let num = mongoose.Types.ObjectId(req.query.link)
  console.log('this is query', req.query.hasOwnProperty('link'))
  if (!req.query.hasOwnProperty('link')) {
    res.redirect('404')
  } else {
    cat_data().then((cat_data) => {
      sub_cat_data().then((sub_cat_data) => {
        city_data().then((city_data) => {
          let get_otp = parseInt(req.body.otp)
          // console.log(req.body);
          pool.user_data.findOne({ _id: num }, (err, result) => {
            if (err) throw err
            // checking otp is same or not
            if (result.user_otp === get_otp) {
              pool.user_data.updateOne(
                { user_otp: get_otp },
                { user_status: 1 },
                (err, result) => {
                  if (err) throw err
                  res.render('user_verification', {
                    title: 'oldmela.com',
                    city_data: city_data,
                    cat_data: cat_data,
                    sub_cat_data: sub_cat_data,
                    user_name: '',
                    msg: 'Verification successful',
                  })
                },
              ) // end of update
            } else {
              res.render('user_verification', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: '',
                msg: 'Invalid otp',
              })
            }
          }) // end of findone
        }) // end of city
      }) // end of sub catagories
    }) // end of catagories
  } // end of req.qeury if statement
}) // end of get method

// ========================================= end of user verification root sections ==================================================

// ========================================= start of user login root sections =======================================================
// get method
router.get('/login', function (req, res, next) {
  let session = req.session
  if (session.phone) {
    res.redirect('/dash_board')
  }
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        res.render('user_login', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          msg: '',
        })
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of get method

// post method
router.post('/login', function (req, res, next) {
  // console.log(req.body);
  cat_data().then((cat_data) => {
    sub_cat_data().then((sub_cat_data) => {
      city_data().then((city_data) => {
        pool.user_data.findOne(
          { user_mobile: parseInt(req.body.phone) },
          (err, data) => {
            if (err) throw err
            // console.log(data);
            if (data) {
              let match = bcrypt.compareSync(
                req.body.password,
                data.user_password,
              )
              if (match) {
                var session = req.session
                session.name = data.user_name
                session.phone = data.user_mobile
                session.user_id = data._id
                // console.log(data._id);
                // console.log(session.phone,session);
                res.redirect('/dash_board?id=' + String(data._id))
              } else {
                res.render('user_login', {
                  title: 'oldmela.com',
                  city_data: city_data,
                  cat_data: cat_data,
                  sub_cat_data: sub_cat_data,
                  user_name: '',
                  msg: 'Invalid password',
                })
              }
            } else {
              res.render('user_login', {
                title: 'oldmela.com',
                city_data: city_data,
                cat_data: cat_data,
                sub_cat_data: sub_cat_data,
                user_name: '',
                msg: 'Invalid mobile',
              })
            }
          },
        ) // end of pool
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
}) // end of get method
// ========================================= end of user login root sections ==========================================================

/* =======================================GET user home page.================================================= */
router.get('/dash_board', logout, (req, res, next) => {
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
          res.render('users/index', {
            title: 'oldmela.com',
            city_data: city_data,
            cat_data: cat_data,
            sub_cat_data: sub_cat_data,
            user_data: result,
            user_name: session.name,
          })
        }) // end of user data
      }) // end of city
    }) // end of sub catagories
  }) // end of catagories
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
            console.log(data);
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

router.post('/myADs', logout, (req, res)=>{
  res.send("this is delete method");
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
          console.log(result);
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
  console.log(req.body);
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
            console.log(result);
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
router.get('/change_password', (req, res, next) => {
  next()
})
// ========================================= end of change password sections ===================================================

// ========================================= start donation section    ==================================================
router.get('/donation', (req, res, next) => {
  next()
})
// ========================================= end of donation sections ===================================================

// ========================================= start logout section    ==================================================
router.get('/logout', (req, res) => {
  req.session.destroy((err, result) => {
    if (err) throw err
    // console.log("logout ho gya", result)
  })
  res.redirect('/')
})
// ========================================= end of logout sections ===================================================

module.exports = router
