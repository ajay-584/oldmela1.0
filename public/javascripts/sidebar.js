const pool = require('./../model/pool');
const mongoose = require('mongoose');



var cat_data = async ()=>{
    try{
      var data = await pool.cat_data.find();
    }catch(err){
      if(err) throw err;
    }
    return data;
  };
  cat_data().then(data=>console.log(data));