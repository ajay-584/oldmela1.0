const pool = require('./../model/pool');

const pendingAds = async()=>{
    return await pool.ads_data.find({ads_status:false}).sort({_id:-1});
}


module.exports = pendingAds;