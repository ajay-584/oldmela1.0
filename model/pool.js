const mongoose = require('mongoose');

// ads collection
const ads_schema = mongoose.Schema({
    ads_title:{type:String},
    ads_price:Number,
    ads_cat_id:{type:mongoose.Types.ObjectId, ref:'cat_data'},
    ads_sub_cat_id:{type:mongoose.Types.ObjectId, ref:'sub_cat_data'},
    ads_img:[String],
    ads_video:{type:String, default:'0'},
    ads_description:{type:String},
    ads_city:String,
    ads_location:{
        type:{
            String,
            enum:['Point'],
            required:true
        },
        coordinates: {
            type: [],
            required: true
        }
    },
    ads_phone:Number,
    ads_address:{type:String},
    ads_date:{type:Date, default: Date.now()},
    user_id:{type:mongoose.Types.ObjectId, ref:'user_data'},
    ads_status:{type:Boolean, default:false}
});
ads_schema.index({ads_title:'text', ads_description:'text', ads_address:'text', ads_city:'text', ads_location:'2dsphere'});
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

// add state
const state_schema = mongoose.Schema({
    name:String,
    date:{type:Date, default:Date.now()}
});
var state_model = mongoose.model('state_model', state_schema, 'state_data');

// add City
const city_schema = mongoose.Schema({
    name:String,
    state_id:{type:mongoose.Types.ObjectId, ref:'state_data'},
    date:{type:Date, default:Date.now()}
});
var city_model = mongoose.model('city_model', city_schema,'city_data');

// express visitor counter
const visitor_schema = mongoose.Schema({
    ip:String,
    date:{type:Date, default:Date.now()}
});
var visitor_model = mongoose.model('visitor_mode', visitor_schema, 'visitor_data');

// Contact us
const contact_schema = mongoose.Schema({
    name :String,
    phone_or_email: String,
    message:String,
    status:{type:Number, default:0},
    date:{type:Date, default:Date.now()}
});
var contact_model = mongoose.model('contact_model', contact_schema, 'contact_data');

module.exports = {
    ads_data : ads_model,
    cat_data : cat_model,
    sub_cat_data : sub_cat_model,
    user_data : sign_up_model,
    state_data:state_model,
    city_data : city_model,
    contact_data : contact_model,
    visitor_data : visitor_model
};