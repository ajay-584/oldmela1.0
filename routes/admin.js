var express = require('express');
const pool = require('./../model/pool');
const mongoose = require('mongoose');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// ==============================Add cat========================
router.get('/cat', function(req,res){
res.render('admin/add_cat',{msg:""});
});
// post mehtod
router.post('/cat', function(req,res){
  pool.cat_data.create({
    name:req.body.cat
  },function(err,data){
    if(err) throw err;
    console.log(data);
  },(err,result)=>{
    if(err) throw err;
    // console.log(result);
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



module.exports = router;
