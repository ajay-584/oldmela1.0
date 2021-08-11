var express = require('express');
const pool = require('./../model/pool');
const mongoose = require('mongoose');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    const adminSession = req.session;
    if(!adminSession.phone){
      return res.redirect('admin/admin_login');
    } 
    return res.render('admin/index');
  }catch(e){
    console.log(e);
    next();
  }
});

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
