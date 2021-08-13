var express = require('express');
const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

var router = express.Router();


const filePath = process.env.FILE_URL // There is file path of images file

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  try{
    const adminSession = req.session;
    const approvedAds = await pool.ads_data.find({ads_status:true});
    const pendingAds = await pool.ads_data.find({ads_status:false});
    const authUsers = await pool.user_data.find({user_status:1});
    const unAuthUsers = await pool.user_data.find({user_status:0});
    const noOfCity = await pool.city_data.find();
    const noOfCategories = await pool.cat_data.find();
    const noOfSubCat = await pool.sub_cat_data.find();
    // if(!adminSession.phone){
    //   return res.redirect('admin/admin_login');
    // } 
    return res.render('admin/index',{
      pendingAds:pendingAds.length,
      approvedAds:approvedAds.length,
      authUsers: authUsers.length,
      unAuthUsers: unAuthUsers.length,
      noOfCity:noOfCity.length,
      noOfCategories:noOfCategories.length,
      noOfSubCat: noOfSubCat.length
    });
  }catch(e){
    console.log(e);
    next();
  }
});

// Get method of pending ads
router.get('/pending_ads', async (req, res, next)=>{
  try{
    const pendingAds = await helper.pendingAds();
    return res.render('admin/pendingAds', {ads_data:pendingAds, moment: moment});
  }catch(e){
    console.log(e);
    next();
  }
});
// Get admin approve ads
router.get('/approve_ads', async (req, res, next)=>{
  try{
    const id = mongoose.Types.ObjectId(req.query.id);
    await pool.ads_data.updateOne({_id:id},{ads_status:true});
    return res.redirect('/admin/pending_ads');
  }catch(e){
    console.log(e);
    next();
  }
});
// Get admin discard ads
router.get('/admin_delete_ads', async (req, res, next)=>{
  try{
    const ad_id = mongoose.Types.ObjectId(req.query.id);
    const ads_data = await pool.ads_data.findOne({_id:ad_id});
    // console.log(ads_data);
    // deleting images from image folder
    if(ads_data.ads_img1){
      await helper.deleteImage(ads_data.ads_img1);
    }
    if(ads_data.ads_img2){
      await helper.deleteImage(ads_data.ads_img2);
    }
    if(ads_data.ads_img3){
      await helper.deleteImage(ads_data.ads_img3);
    }
    // Deleting ads data from database
    if(ads_data){
      await pool.ads_data.deleteOne({_id:ads_data._id});
    }
    // console.log("images and data has been deleted");
    return res.redirect('/admin/pending_ads');
  }catch(e){
    console.log(e);
    next();
  }
})
// ==============================Add cat========================
router.get('/cat', function(req,res){
res.render('admin/add_cat',{msg:""});
});
// post mehtod
router.post('/cat', function(req,res){
  pool.cat_data.create({
    name:req.body.cat
  });
res.render('admin/add_cat', {msg:"Data has been inseted!"});
});


// ==============================Add sub cat========================
router.get('/sub_cat', async (req,res)=>{
  try{
    var cat_data = await pool.cat_data.find();
  }catch(err){
    console.log(err)
  }
  res.render('admin/add_sub_cat', {cat_data:cat_data, msg:''});
});

// post method
router.post('/sub_cat', (req,res)=>{
  pool.sub_cat_data.create({
    name:req.body.sub_cat,
    cat_id:req.body.cat_id
  });
  res.render('admin/add_sub_cat', {cat_data:'' ,msg:'Data has been inserted!'});
});


// ==============================Add cat========================
router.get('/city', function(req,res){
  res.render('admin/add_city',{msg:""});
  });
// post mehtod
router.post('/city', function(req,res){
  pool.city_data.create({
  name:req.body.city
  });
  res.render('admin/add_city', {msg:"Data has been inseted!"});
  });

// ========================Admin Loigin =========================
router.get('/admin_login', (req, res, next)=>{
  try{
    return res.render('admin/adminLogin', {msg:''});
  }catch(e){
    console.log(e);
    next();
  }
});
//  Post method
router.post('/admin_login', (req, res, next)=>{
  try{
    return res.render('admin/adminLogin', {msg:''});
  }catch(e){
    console.log(e);
    next();
  }
})

module.exports = router;
