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

// add categories
const cat_schema = mongoose.Schema({
    name:String,
    date:{type:Date, default:Date.now()}
});
var cat_model = mongoose.model('cat_model', cat_schema,'cat_data');

// add sub categoreis
const sub_cat_schema = mongoose.Schema({
    name:String,
    cat_id:{type:mongoose.Types.ObjectId,ref:'cat_data'},
    date:{type:Date, default:Date.now()}
});
var sub_cat_model = mongoose.model('sub_cat_model', sub_cat_schema, 'sub_cat_data');

module.exports = {
    ads_data : ads_model,
    cat_data : cat_model,
    sub_cat_data : sub_cat_model 
};