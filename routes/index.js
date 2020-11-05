var express = require('express');
const pool = require('./../model/pool');
var uuid = require('uuid');
var moment = require('moment');
const mongoose = require('mongoose');

var router = express.Router();

var filePath = process.env.FILE_URL;    // There is file path of images file

/* =======================================GET home page.================================================= */
router.get('/', async function(req, res, next) {
  var ads_data = await pool.find({});
  // console.log("ads_data",ads_data);
  res.render('index', { title: 'oldmela.com', ads_data:ads_data, moment:moment });
});
// ========================================= end of home sections ==================================================

// ========================================= Start of main ads page sections ==================================================
router.get('/card', async function(req,res){
  try{
    var ads_info =  await pool.findOne({_id:{$eq:mongoose.Types.ObjectId(req.query.link)}});
    console.log(ads_info);
  }catch(err){
    if(err) throw err
  }
  // console.log(req.query.link);
  res.render('ads_page', { title: 'oldmela.com', ads_info:ads_info, moment:moment });
});
// ========================================= end of main ads page sections ====================================================

// ========================================= Start sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', function(req, res, next){
  res.render('users/sell_ads', { title: 'oldmela.com', msg:'' });
});
// post method------------------------------------------------------------
router.post('/sell_ads', (req,res)=>{
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
pool.create({
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
    res.render('users/sell_ads', { title: 'oldmela.com', msg:msg});
  }
    // console.log("insert ho gya",data);
    msg = "The ads data has been submitted Thank you!"
    res.render('users/sell_ads', { title: 'oldmela.com', msg:msg});
  }); // end of ads insert
}); // end of post method 

// ========================================= end of sell ads sections ==================================================

module.exports = router;