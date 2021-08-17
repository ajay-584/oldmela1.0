const pool = require('./../model/pool');
const moment = require('moment');
exports.searchAds = async (req, res, next)=>{
    try{
      let session = req.session;
      const text = req.query.search;
      const city = await pool.city_data.find().sort({name:1});
      const cat = await pool.cat_data.find().sort({name:1});
      const sub_cat = await pool.sub_cat_data.find().sort({name:1});
      const ads = await pool.ads_data.find({$and:[{ $text: { $search: text } }, {ads_status:1}]}).sort({_id:-1});
      res.render('index', {
        title: 'oldmela.com',
        city_data: city,
        cat_data: cat,
        sub_cat_data: sub_cat,
        ads_data: ads,
        moment: moment,
        user_name: session.name,
        check:4
      });
    }catch(e){
      console.log("Error in search page");
      console.log(e);
      next();
    }
  }