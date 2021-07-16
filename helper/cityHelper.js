const {response, request} = require('express');
const pool = require('../model/pool');

const add_city = (id)=>{
    return new Promise(async(resolve, reject)=>{
        await pool.ads_data.aggregate([
            {
                $lookup:
                {
                    from: 'city_data',
                    localField: 'ads_city_id',
                    foreignField: '_id',
                    as: 'city_data'
                }
            }
        ], (err, res)=>{
            if(err){
                return reject(err);
            }
            res.forEach((ele)=>{
                for(x of ele.city_data){
                    if(String(x._id) === String(id)){
                        return resolve(x.name);
                    }
                    return resolve("NA");
                }
            });
        });
    });
}


module.exports = add_city;