const pool = require('../model/pool');

exports.homeGet = async(req, res, next)=> {
    try{
      const approvedAds = await pool.ads_data.find({ads_status:true});
      const pendingAds = await pool.ads_data.find({ads_status:false});
      const authUsers = await pool.user_data.find({user_status:1});
      const unAuthUsers = await pool.user_data.find({user_status:0});
      const noOfCity = await pool.city_data.find();
      const noOfCategories = await pool.cat_data.find();
      const noOfSubCat = await pool.sub_cat_data.find();
      // if(!adminSession.phone){
      //   return res.redirect('admin/admin_login');
      // } 
      return res.render('admin/index',{
        pendingAds:pendingAds.length,
        approvedAds:approvedAds.length,
        authUsers: authUsers.length,
        unAuthUsers: unAuthUsers.length,
        noOfCity:noOfCity.length,
        noOfCategories:noOfCategories.length,
        noOfSubCat: noOfSubCat.length
      });
    }catch(e){
      console.log(e);
      next();
    }
  }