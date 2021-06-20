const mongoose = require('mongoose');

// ads collection
const ads_schema = mongoose.Schema({
    ads_title:String,
    ads_price:Number,
    ads_cat_id:{type:mongoose.Types.ObjectId, ref:'cat_data'},
    ads_sub_cat_id:{type:mongoose.Types.ObjectId, ref:'sub_cat_data'},
    ads_img1:{type:String, default:null},
    ads_img2:{type:String, default:null},
    ads_img3:{type:String, default:null},
    ads_description:String,
    ads_city_id:{type:mongoose.Types.ObjectId, ref:'city_data'},
    ads_phone:Number,
    ads_address:String,
    ads_date:{type:Date, default: Date.now()},
    user_id:{type:mongoose.Types.ObjectId, ref:'user_data'}
});
var ads_model = mongoose.model('ads_model',ads_schema,'ads_data');

// user resigration schema
const sign_up_schema = mongoose.Schema({
    user_mobile:Number,
    user_name:String,
    user_password:String,
    user_status:{type:Number, default:0},
    user_otp:{type:Number, default:0},
    user_date:{type:Date, default:Date.now()},
    user_gender:{type:String, default:'Na'},
    user_address:{type:String, default:'Na'},
    user_email:{type:String, default:'Na'}
});
const sign_up_model = mongoose.model('sign_up_model', sign_up_schema, 'user_data');

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

// add City
const city_schema = mongoose.Schema({
    name:String,
    date:{type:Date, default:Date.now()}
});
var city_model = mongoose.model('city_model', city_schema,'city_data');

module.exports = {
    ads_data : ads_model,
    cat_data : cat_model,
    sub_cat_data : sub_cat_model,
    user_data : sign_up_model,
    city_data : city_model
};