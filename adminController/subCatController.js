const pool = require('./../model/pool');
const moment = require('moment');

exports.subCatGet = async (req,res)=>{
    try{
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      res.render('admin/add_sub_cat', {cat_data:cat_data, subCatData:sub_cat_data, moment:moment, msg:''});
    }catch(err){
      console.log(err)
    }
  }

exports.subCatPost = async (req, res, next)=>{
  try{
    await pool.sub_cat_data.create({
      name:req.body.sub_cat,
      cat_id:req.body.cat_id
    });
    const cat_data = await pool.cat_data.find().sort({name:1});
    const subCatData = await pool.sub_cat_data.find().sort({name:1});
    return res.render('admin/add_sub_cat', {cat_data:cat_data, subCatData:subCatData, moment:moment, msg:'Data has been inserted!'});
  }catch(e){
    console.log(e);
    next();
  }
}