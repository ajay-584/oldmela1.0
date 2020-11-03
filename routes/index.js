var express = require('express');
const pool = require('./../model/pool');

var router = express.Router();

/* =======================================GET home page.================================================= */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'oldmela.com' });
});



// ========================================= sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', function(req, res, next){
  res.render('users/sell_ads', { title: 'oldmela.com', msg:'' });
});
// post method
router.post('/sell_ads', (req,res)=>{
 console.log(req.body);
  res.render('users/sell_ads', { title: 'oldmela.com', msg:'Sab thik chal raha h'});
});


module.exports = router;