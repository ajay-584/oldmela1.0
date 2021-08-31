const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

exports.catGet = async(req, res, next)=>{
    try{
      const catData = await pool.cat_data.find().sort({name:1});
      return res.render('admin/add_cat',{catData, moment, fail:"", pass:""});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.catPost = async(req, res, next)=>{
    try{
      const cat = (req.body.cat).trim();
      const checkCat = await pool.cat_data.findOne({name:cat});
      if(checkCat){
        const catData = await pool.cat_data.find().sort({name:1});
        return res.render('admin/add_cat', {catData, moment, fail:`${cat} is already exit!`, pass:""});
      }
      await pool.cat_data.create({
        name:cat
      });
      const catData = await pool.cat_data.find().sort({name:1});
    return res.render('admin/add_cat', {catData, moment, fail:"", pass:`${cat} has been inserted!`});
    }catch(e){
      console.log(e);
      next();
    }
  }