var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'oldmela.com' });
});



// ========================================= sell ads sections ==================================================
/* GET sell ads pate */
router.get('/sell_ads', function(req, res, next){
  res.render('users/sell_ads', { title: 'oldmela.com' });
});



module.exports = router;