const pool = require('./../model/pool');
const moment = require('moment');
const mongoose = require('mongoose');
const helper = require('../helper/index');

// Ajax route for cat adn subcat data on side bar section
exports.ajaxCatData = async(req, res, next)=>{
    try{
        const cat_data = await pool.cat_data.find().sort({name:1});
        const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
        res.render('catData',{cat_data, sub_cat_data});
    }catch(e){
        console.log(e);
        next();
    }
}

// Ajax route for city data on header city search section
exports.ajaxCityData = async(req, res, next)=>{
    try{
        const cityData = await pool.city_data.find();
        res.json(cityData);
    }catch(e){
        console.log(e);
        next();
    }
}

// Ajax route for select sub categories on sell section
exports.sellSubCatAjax = async (req, res, next) => {
    try{
        var val = req.query.value
        const data = await pool.sub_cat_data.find({});
        var catArray = []
        for(x of data){
            if(String(x.cat_id) === val){
                // console.log(x.cat_id)
                catArray.push(x)
            }
        }
        // console.log("this is cat array:",catArray);
        return res.render('users/sellsubcatajax', { data: catArray });
    }catch(e){
        console.log(e);
        next();
    }
  }

// Ajax route for map my india token generator
exports.mapToken = async (req, res, next) => {
    try{
        const token = await helper.mapToken();
        res.send(token);
    }catch(e){
        console.log(e);
        next();
    }
  }

// Ajax route for map my india address generator
exports.geoAddress = async (req, res, next) => {
    try{
        // console.log("Map Address calling",req.query);
        const address = await helper.geoAddress(req.query.address);
        res.send(address);
    }catch(e){
        console.log(e);
        next();
    }
  }