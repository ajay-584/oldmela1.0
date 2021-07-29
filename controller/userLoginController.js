const express = require('express')
const pool = require('../model/pool')
const uuid = require('uuid')
const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const middleware = require('../middleware/index');
const helper = require('../helper/index');


exports.loginGet = async(req, res, next)=> {
    try{
      const city_data = await pool.city_data.find();
      const cat_data = await pool.cat_data.find();
      const sub_cat_data = await pool.sub_cat_data.find();
      let session = req.session
      if (session.phone) {
        return res.redirect('/dash_board')
      }
      return res.render('user_login', {
        title: 'oldmela.com',
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_name: '',
        msg: '',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.loginPost = async (req, res, next) => {
    try{
      const city_data = await pool.city_data.find();
      const cat_data = await pool.cat_data.find();
      const sub_cat_data = await pool.sub_cat_data.find();
      // Fetching user data from database
      const data = await pool.user_data.findOne({ user_mobile: parseInt(req.body.phone) });
      // when user exist
      if (data) {
        // Checking password is same or not
        const match = bcrypt.compareSync(req.body.password,data.user_password);
        // When user is not verified 
        if(!data.user_status){
          return res.render('user_login', {
            title: 'oldmela.com',
            city_data: city_data,
            cat_data: cat_data,
            sub_cat_data: sub_cat_data,
            user_name: '',
            msg: 'This number is not verified',
          });
        } else if (match) {
          // When user verified and password is also same
          // storing the session
          var session = req.session;
            session.name = data.user_name;
            session.phone = data.user_mobile;
            session.user_id = data._id;
          return res.redirect('/dash_board?id=' + String(data._id));
        }else {
          // When user password does not matched
            return res.render('user_login', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_name: '',
              msg: 'Invalid password',
            });
        }
      } else {
        // When user mobile does not exist in database
        return res.render('user_login', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          msg: 'Invalid mobile number',
        })
      }
    }catch(e){
      console.log(e);
      next();
    }
}