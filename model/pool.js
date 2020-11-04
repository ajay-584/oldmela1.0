const mongoose = require('mongoose');

// ads collection
const ads_schema = mongoose.Schema({
    ads_title:String,
    ads_price:Number,
    ads_cat:String,
    ads_sub_cat:String,
    ads_img1:{type:String, default:null},
    ads_img2:{type:String, default:null},
    ads_img3:{type:String, default:null},
    ads_description:String,
    ads_city:String,
    ads_phone:Number,
    ads_address:String,
    ads_date:{type:Date, default: Date.now()}
});
var ads_model = mongoose.model('ads_model',ads_schema,'ads_data');

module.exports = ads_model;