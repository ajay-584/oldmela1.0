const pool = require('./../model/pool');
const moment = require('moment');
exports.searchAds = async (req, res, next)=>{
    try{
      let session = req.session;
      const text = req.query.search;
      const city = await pool.city_data.find();
      const cat = await pool.cat_data.find();
      const sub_cat = await pool.sub_cat_data.find();
      const ads = await pool.ads_data.find({$and:[{ $text: { $search: text } }, {ads_status:1}]});
      res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads,
        moment: moment,
        user_name: session.name,
      });
    }catch(e){
      console.log("Error in search page");
      console.log(e);
      next();
    }
  }