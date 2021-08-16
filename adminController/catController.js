const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

exports.catGet = async(req, res, next)=>{
    try{
      const catData = await pool.cat_data.find().sort({name:1});
      res.render('admin/add_cat',{catData:catData, moment:moment, msg:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.catPost = async(req, res, next)=>{
    try{
      await pool.cat_data.create({
        name:req.body.cat
      });
      const catData = await pool.cat_data.find().sort({name:1});
    res.render('admin/add_cat', {catData:catData, moment:moment, msg:"Data has been inserted!"});
    }catch(e){
      console.log(e);
      next();
    }
  }