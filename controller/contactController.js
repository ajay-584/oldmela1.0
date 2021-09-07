const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');


exports.contactGet = async(req, res, next)=>{
    try{ 
        let session = req.session;
        return res.render('contactUs', {user_name: session.name, fail:'', pass:''});
    }catch(e){
        console.log(e);
        next();
    }
}

exports.contactPost = async(req, res, next)=>{
    try{ 
        let session = req.session;
        const name = req.body.name;
        const phone_or_email = req.body.email_or_phone;
        const message = req.body.message;
        await pool.contact_data.create({name, phone_or_email, message});
        return res.render('contactUs', {user_name: session.name, fail:'', pass:`Dear ${name} message has been sent. Thank you!`});
    }catch(e){
        console.log(e);
        next();
    }
}