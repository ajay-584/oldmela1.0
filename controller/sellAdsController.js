const pool = require('../model/pool');
const helper = require('../helper/index');

const filePath = process.env.FILE_URL // There is file path of images file

exports.sellAdsGet = async (req, res, next)=> {
    try{
      let session = req.session;
      const city_data = await pool.city_data.find().sort({name:1});
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      return res.render('users/sell_ads', {
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_data: user_data,
        user_name: session.name,
        fail: '',
        pass:'',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.sellAdsPost = async (req, res, next) => {
    try{
      let session = req.session;
      const city_data = await pool.city_data.find().sort({name:1});
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      const user_data = await pool.user_data.findOne({ _id: session.user_id });
      // taking all images in images array
      const images = req.files.Img;
      var fileSize = 0
      var img = []
      if(images.length < 5){
        fileSize = images.length;
      }else if(!images.length){
        const img1 = await helper.compressAndMoveImage(images, filePath);
        img.push(img1);
      }else{
        fileSize = 5
      }
      console.log("file size",fileSize);
      if(fileSize){
        for(let i=0; i < fileSize; i++){
          const img1 = await helper.compressAndMoveImage(images[i], filePath);
          img.push(img1);
        }
      }
      console.log(img);
      await pool.ads_data.create(
            {
              ads_title: req.body.ads_name,
              ads_price: req.body.ads_price,
              ads_cat_id: req.body.ads_cat,
              ads_sub_cat_id: req.body.sub_ads_cat,
              ads_img: img,
              ads_video:req.body.ads_video,
              ads_description: req.body.description,
              ads_city_id: req.body.city,
              ads_phone: req.body.phone,
              ads_address: req.body.address,
              user_id: session.user_id,
        }); // end of insert data
        return res.redirect('/myAds');
    }catch(e){
      console.log(e);
      next();
    }
  }