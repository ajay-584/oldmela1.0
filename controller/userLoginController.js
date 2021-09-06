const pool = require('../model/pool');
const bcrypt = require('bcryptjs');


exports.loginGet = async(req, res, next)=> {
    try{
      let session = req.session
      if (session.phone) {
        return res.redirect('/dash_board')
      }
      return res.render('user_login', {
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
      const userPhone = req.body.phone; 
      // Fetching user data from database
      const data = await pool.user_data.findOne({ user_mobile: parseInt(req.body.phone) });
      // when user exist
      if (data) {
        // Checking password is same or not
        const match = bcrypt.compareSync(req.body.password,data.user_password);
        // When user is not verified 
        if(!data.user_status){
          return res.render('user_login', {
            user_name: '',
            fail: `${userPhone} is not verified`,
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
              user_name: '',
              fail: 'Invalid password',
              pass:'',
            });
        }
      } else {
        // When user mobile does not exist in database
        return res.render('user_login', {
          user_name: '',
          fail: `${userPhone} does not registered!`,
          pass:'',
        });
      }
    }catch(e){
      console.log(e);
      next();
    }
}