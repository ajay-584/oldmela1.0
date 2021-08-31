const pool = require('../model/pool');
const bcrypt = require('bcryptjs');


exports.loginGet = async(req, res, next)=> {
    try{
      const city_data = await pool.city_data.find().sort({name:1});
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      let session = req.session
      if (session.phone) {
        return res.redirect('/dash_board')
      }
      return res.render('user_login', {
        title: 'oldmela.com',
        city_data: city_data,
        cat_data: cat_data,
        sub_cat_data: sub_cat_data,
        user_name: '',
        fail: '',
        pass:'',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }

exports.loginPost = async (req, res, next) => {
    try{
      const city_data = await pool.city_data.find().sort({name:1});
      const cat_data = await pool.cat_data.find().sort({name:1});
      const sub_cat_data = await pool.sub_cat_data.find().sort({name:1});
      // Fetching user data from database
      const data = await pool.user_data.findOne({ user_mobile: parseInt(req.body.phone) });
      // when user exist
      if (data) {
        // Checking password is same or not
        const match = bcrypt.compareSync(req.body.password,data.user_password);
        // When user is not verified 
        if(!data.user_status){
          return res.render('user_login', {
            title: 'oldmela.com',
            city_data: city_data,
            cat_data: cat_data,
            sub_cat_data: sub_cat_data,
            user_name: '',
            fail: `${data.user_mobile} is not verified`,
            pass:'',
          });
        } else if (match) {
          // When user verified and password is also same
          // storing the session
          var session = req.session;
            session.name = data.user_name;
            session.phone = data.user_mobile;
            session.user_id = data._id;
          return res.redirect('/dash_board?id=' + String(data._id));
        }else {
          // When user password does not matched
            return res.render('user_login', {
              title: 'oldmela.com',
              city_data: city_data,
              cat_data: cat_data,
              sub_cat_data: sub_cat_data,
              user_name: '',
              fail: 'Invalid password',
              pass:'',
            });
        }
      } else {
        // When user mobile does not exist in database
        return res.render('user_login', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          fail: `${data.user_mobile} does not registered!`,
          pass:'',
        });
      }
    }catch(e){
      console.log(e);
      next();
    }
}