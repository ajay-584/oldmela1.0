const pool = require('./../model/pool');
const moment = require('moment');

exports.subCatGet = async (req,res)=>{
    try{
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      return res.render('admin/add_sub_cat', {cat_data, subCatData:sub_cat_data, moment, fail:"", pass:""});
    }catch(err){
      console.log(err)
    }
  }

exports.subCatPost = async (req, res, next)=>{
  try{
    const sub_cat = (req.body.sub_cat).trim();
    const checkSubCat = await pool.sub_cat_data.findOne({name:sub_cat});
    if(checkSubCat){
      const cat_data = await pool.cat_data.find().sort({name:1});
      const subCatData = await pool.sub_cat_data.find().sort({name:1});
      return res.render('admin/add_sub_cat', {cat_data, subCatData, moment, fail:`${sub_cat} has been inserted!`, pass:""});
    }
    await pool.sub_cat_data.create({
      name:sub_cat,
      cat_id:req.body.cat_id
    });
    const cat_data = await pool.cat_data.find().sort({name:1});
    const subCatData = await pool.sub_cat_data.find().sort({name:1});
    return res.render('admin/add_sub_cat', {cat_data, subCatData, moment, fail:"", pass:`${sub_cat} has been inserted!`});
  }catch(e){
    console.log(e);
    next();
  }
}