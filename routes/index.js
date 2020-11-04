var express = require('express');
const pool = require('./../model/pool');
var uuid = require('uuid');

var router = express.Router();

var filePath = process.env.FILE_URL;

/* =======================================GET home page.================================================= */
router.get('/', async function(req, res, next) {
  var ads_data = await pool.find({});
  console.log("ads_data",ads_data);
  res.render('index', { title: 'oldmela.com' });
});



// ========================================= Start sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', function(req, res, next){
  res.render('users/sell_ads', { title: 'oldmela.com', msg:'' });
});
// post method------------------------------------------------------------
router.post('/sell_ads', (req,res)=>{
//  console.log(req.body);
// inserting ads data in collection
req.files.img_1.mv(filePath + req.files.img_1.name, function (err, data) {
  // cheking errr
  if (err) {
  console.log('Emp file uploaded fail');
   }
    // console.log('upladed');
  });
  req.files.img_2.mv(filePath + req.files.img_2.name, function (err, data) {
    // cheking errr
    if (err) {
    console.log('Emp file uploaded fail');
     }
      // console.log('upladed');
    });
    req.files.img_3.mv(filePath + req.files.img_3.name, function (err, data) {
      // cheking errr
      if (err) {
      console.log('Emp file uploaded fail');
       }
        // console.log('upladed');
      });
var msg = ""
pool.create({
  ads_title:req.body.ads_name,
  ads_price:req.body.ads_price,
  ads_cat:req.body.ads_cat,
  ads_sub_cat:req.body.sub_ads_cat,
  ads_img1:req.files.img_1.name,
  ads_img2:req.files.img_2.name,
  ads_img3:req.files.img_3.name,
  ads_description:req.body.description,
  ads_city:req.body.city,
  ads_phone:req.body.phone,
  ads_address:req.body.address
},(err,data)=>{
  if(err){
    console.log("there is error in inserting");
    msg="There is someting wrong please try agian"
    res.render('users/sell_ads', { title: 'oldmela.com', msg:msg});
  }
    console.log("insert ho gya",data);
    msg = "The ads data has been submitted Thank you!"
    res.render('users/sell_ads', { title: 'oldmela.com', msg:msg});
});
});
// ========================================= end of sell ads sections ==================================================

module.exports = router;