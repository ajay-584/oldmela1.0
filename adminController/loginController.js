const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.loginGet = (req, res, next)=>{
    try{
      return res.render('admin/adminLogin', {msg:''});
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.loginPost = (req, res, next)=>{
    try{
      const session = req.session;
      const phone = req.body.phone;
      const password = req.body.password;
      if(process.env.ADMIN_PHONE == phone && process.env.ADMIN_PASS == password){
        session.adminPhone = phone;
        return res.redirect('/admin');
      }
      return res.render('admin/adminLogin', {msg:'Invalid phone and password!'});
    }catch(e){
      console.log(e);
      next();
    }
  }