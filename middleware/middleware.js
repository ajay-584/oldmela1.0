const rateLimit = require("express-rate-limit");
const pool = require('./../model/pool');

//  This is request limit middleware only 5 times they can try for forget password
exports.limitReq = rateLimit({
  windowMs: 360 * 60 * 1000, // 6 hours
  max: 5,
  handler: async(req, res, next)=>{
    try{
        const city_data = await pool.city_data.find();
        const cat_data = await pool.cat_data.find();
        const sub_cat_data = await pool.sub_cat_data.find();
        return res.render('userForgetPassword', {
          title: 'oldmela.com',
          city_data: city_data,
          cat_data: cat_data,
          sub_cat_data: sub_cat_data,
          user_name: '',
          msg:'You have cross the maximum limit, please try after 12 hours.'
        });
    }catch(e){
        console.log(e);
        next();
    }
}
});

// User auth if they are not login
exports.auth = (req, res, next)=> {
    try{
        const user_session = req.session;
        if (!user_session.phone) {
          return res.redirect('/login');
        }
        next()
    }catch(e){
        console.log(e);
        next();
    }
  }

//   If user already logged in then
exports.logged = (req, res, next)=>{
    try{
        const user_session = req.session;
        if (user_session.phone) {
            return res.redirect('/dash_board');
          }
          next();
    }catch(e){
        console.log(e);
        next();
    }
}

exports.adminAuth = (req, res, next)=>{
  try{
    const session = req.session;
    if(!session.adminPhone){
      return res.redirect('/admin/admin_login')
    }
    next();
  }catch(e){
    console.log(e);
    next();
  }
}