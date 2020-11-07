var express = require('express');
const pool = require('./../model/pool');
var uuid = require('uuid');
var moment = require('moment');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var router = express.Router();

var filePath = process.env.FILE_URL;    // There is file path of images file

var city_data = async ()=>{
  let data = await  pool.city_data.find({});
  console.log(data)
  return data;
};
var cat_data = async ()=>{
    let data = await  pool.cat_data.find({});
    return data;
};
var sub_cat_data = async ()=>{
  var data = await  pool.sub_cat_data.find({});
  return data;
};
// Generating 4 digit random no for otp
var a = Math.floor(100000 + Math.random() * 900000)
a = a.toString().substring(0, 4);
a =  parseInt(a);
// console.log(a)

/* =======================================GET home page.================================================= */
router.get('/', async function(req, res, next) {
  var ads_data = await pool.ads_data.find();
  cat_data().then((cat_data)=>{
    sub_cat_data().then((sub_cat_data)=>{
      city_data().then((city_data)=>{
        res.render('index', { title: 'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, ads_data:ads_data, moment:moment });
      }); // end of city
    }); // end of sub catagories
  }); // end of catagories
});  // end of get method 
// ========================================= end of home sections ==================================================

// ========================================= Start of main ads page sections ==================================================
router.get('/card', async function(req,res){
  try{
    var ads_info =  await pool.ads_data.findOne({_id:{$eq:mongoose.Types.ObjectId(req.query.link)}});
    // console.log(ads_info);
  }catch(err){
    if(err) throw err
  }
  // console.log(req.query.link);
  cat_data().then((cat_data)=>{
    sub_cat_data().then((sub_cat_data)=>{
      city_data().then((city_data)=>{
        res.render('ads_page', { title: 'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, ads_info:ads_info, moment:moment });
      }); // end of city
    }); // end of sub catagories
  }); // end of catagories
});
// ========================================= end of main ads page sections ====================================================

// ========================================= start of sign up page sections ====================================================
router.get('/sign_up', (req,res)=>{
  cat_data().then((cat_data)=>{
    sub_cat_data().then((sub_cat_data)=>{
      city_data().then((city_data)=>{
        res.render('user_sign_up', { title:'oldmela.com',city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:''});
      }); // end of city
    }); // end of sub catagories
  }); // end of catagories
});
// post method
router.post('/sign_up', (req,res)=>{
  cat_data().then((cat_data)=>{
    sub_cat_data().then((sub_cat_data)=>{
      city_data().then((city_data)=>{
        // Checking password and confirm password is same or not?
        if(req.body.password === req.body.confirmPassword){
          pool.user_data.find({user_mobile:parseInt(req.body.mobile)},(err,result)=>{
            if(err) throw err;
            // Checking mobile nuber already exit or not?
            if(result.length < 1){
              const hash_pass = bcrypt.hashSync(req.body.password,10);
                pool.user_data.create({
                  user_mobile:req.body.mobile,
                  user_name:req.body.name,
                  user_password:hash_pass,
                }, (err,result)=>{
                if(err) throw err;
                  res.render('user_sign_up', { title:'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:'done'});
                });  // end of create data
            }else{
              res.render('user_sign_up', { title:'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:'Mobile has already register'});
            }
          }); // end of find data
        }else{
          res.render('user_sign_up', { title:'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:'Confirm password does not matched!'});
        }
      }); // end of city
    }); // end of sub catagories
  }); // end of catagories
}); // end of post method
// ========================================= end of sign up page sections ======================================================

// ========================================= Start sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', function(req, res, next){
  cat_data().then((cat_data)=>{
    sub_cat_data().then((sub_cat_data)=>{
      city_data().then((city_data)=>{
        res.render('users/sell_ads', { title: 'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:'' });
      }); // end of sub city
    }); // end of sub catagories
  }); // end of catagories
});
// post method------------------------------------------------------------
router.post('/sell_ads', (req,res)=>{
  cat_data().then((cat_data)=>{
    sub_cat_data().then((sub_cat_data)=>{
      city_data().then((city_data)=>{
        //  console.log(req.body);
        // inserting ads data in collection
        var img1 = '';
        // checking images is uploaded or not
        if(req.files.img_1){
          let extesion = req.files.img_1.mimetype.replace(/\//g,' ').split(' ')[1];
          img1 = uuid.v1() + '.' + extesion;
          // moving image in imgae file
          req.files.img_1.mv(filePath + img1, function (err, data) {
            // cheking errr
            if (err) {
              console.log('Emp file uploaded fail');
            }
            // console.log('upladed');
          });
        }; // end of img1

        var img2 = '';
        if(req.files.img_2){
          let extesion = req.files.img_2.mimetype.replace(/\//g,' ').split(' ')[1];
          img2 = uuid.v1() + '.' + extesion;
          req.files.img_2.mv(filePath + img2, function (err, data) {
            // cheking errr
            if (err) {
              console.log('Emp file uploaded fail');
            }
            // console.log('upladed');
          });
        }; // end of img2

        var img3 = '';
        if(req.files.img_3){
          let extesion = req.files.img_3.mimetype.replace(/\//g,' ').split(' ')[1];
          img3 = uuid.v1() + '.' + extesion;
          req.files.img_3.mv(filePath + img3, function (err, data) {
            // cheking errr
            if (err) {
              console.log('Emp file uploaded fail');
            }
            // console.log('upladed');
          });
        }; // end of img3
        var msg = ""
        pool.ads_data.create({
          ads_title:req.body.ads_name,
          ads_price:req.body.ads_price,
          ads_cat:req.body.ads_cat,
          ads_sub_cat:req.body.sub_ads_cat,
          ads_img1:img1,
          ads_img2:img2,
          ads_img3:img3,
          ads_description:req.body.description,
          ads_city:req.body.city,
          ads_phone:req.body.phone,
          ads_address:req.body.address
        },(err,data)=>{
          if(err){
            console.log("there is error in ads inserting");
            msg="There is someting wrong please try agian"
            res.render('users/sell_ads', { title: 'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:msg});
          }
          // console.log("insert ho gya",data);
          msg = "The ads data has been submitted Thank you!"
          res.render('users/sell_ads', { title: 'oldmela.com', city_data:city_data, cat_data:cat_data, sub_cat_data:sub_cat_data, msg:msg});
        }); // end of ads insert
      }); // end of city
    }); // end of sub catagories
  }); // end of catagories
}); // end of post method 

// ========================================= end of sell ads sections ==================================================

module.exports = router;