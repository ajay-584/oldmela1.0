const pool = require('./../model/pool');
const moment = require('moment');
exports.searchAds = async (req, res, next)=>{
    try{
      let session = req.session;
      const text = req.query.search;
      const city_data = await pool.city_data.find().sort({name:1});
      const ads_data = await pool.ads_data.find({$and:[{ $text: { $search: text } }, {ads_status:1}]}).sort({_id:-1});
      res.render('index', {
        city_data,
        ads_data,
        moment,
        user_name: session.name,
        check:4
      });
    }catch(e){
      console.log("Error in search page");
      console.log(e);
      next();
    }
  }