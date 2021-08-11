const pool = require('./../model/pool');

exports.sellSubCatAjax = async (req, res, next) => {
    try{
        var val = req.query.value
        const data = await pool.sub_cat_data.find({});
        var catArray = []
        for(x of data){
            if(String(x.cat_id) === val){
                // console.log(x.cat_id)
                catArray.push(x)
            }
        }
        // console.log("this is cat array:",catArray);
        return res.render('users/sellsubcatajax', { data: catArray });
    }catch(e){
        console.log(e);
        next();
    }
  }