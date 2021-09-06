const pool = require('../model/pool');
const bcrypt = require('bcryptjs');
const helper = require('../helper/index');



exports.signUpGet = async (req, res) => {
    try{
      let session = req.session;
      // when user already login and trying to access sign_up page
      if (session.phone) {
        return res.redirect('404'); 
      }
      return res.render('user_sign_up', {
        user_name: '',
        fail: '',
        pass:'',
      });
    }catch(e){
      console.log(e);
      next();
    }
  }

  exports.signUpPost = async (req, res) => {
    try{
      const userPhone = req.body.mobile;
      // Checking password and confirm password is same or not?
      if (req.body.password === req.body.confirmPassword) {
        const result = await pool.user_data.find({ user_mobile: parseInt(req.body.mobile) });
        // console.log("user result",result);
            // Checking mobile nuber already exit or not?
            if (result.length < 1) {
              // Generating new otp
              const new_otp = helper.otpGenerator();
              // console.log("this is otp:",new_otp);
              // Decrypting user password
              const hash_pass = bcrypt.hashSync(req.body.password, 10);
              // Adding new user in data base
              const newUser = await pool.user_data.create(
                {
                  user_mobile: req.body.mobile,
                  user_name: req.body.name,
                  user_password: hash_pass,
                  user_otp: new_otp,
                });
                // console.log("user result after creation",newUser);
              //  sending otp to user mobile for verification 
              await helper.otpSender(new_otp, req.body.mobile);
              // Forwarding verification page
              return res.redirect('/verification?link=' + String(newUser._id));
            } else {
              // when user already exit
              return res.render('user_sign_up', {
                user_name: '',
                fail: `${userPhone} is already registered!`,
                pass:'',
              })
            }
      } else {
        // when user password and confirm password does not matched 
        return res.render('user_sign_up', {
          user_name: '',
          fail: 'Confirm password does not matched!',
          pass:'',
        }) // end of response
      } // end of else statement  
    }catch(e){
      console.log(e);
      next();
    }
  }