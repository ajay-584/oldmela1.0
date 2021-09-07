const express = require('express');
// ==========Middleware==========
const middleware = require('../middleware/middleware');
// ========= Admin Controllers ========
const homeController = require('../adminController/homeController');
const penddingAdsController = require('../adminController/penddingAdsController');
const approvedAdsController = require('../adminController/approvedAdsController');
const deleteAdsController = require('../adminController/deleteAdsController');
const usersController = require('../adminController/usersController');
const catController = require('../adminController/catController');
const subCatController = require('../adminController/subCatController');
const stateController = require('../adminController/stateController');
const cityController = require('../adminController/cityController');
const loginController = require('../adminController/loginController');
const logoutController = require('../adminController/logoutController');
const userIpController = require('../adminController/userIpController');
const messageController = require('../adminController/messageController');

var router = express.Router();

const filePath = process.env.FILE_URL // There is file path of images file

/* GET users listing. */
router.get('/', middleware.adminAuth, homeController.homeGet);

// user ip
router.get('/users_ip', middleware.adminAuth, userIpController.usersIpGet);

// Get method of pending ads
router.get('/pending_ads', middleware.adminAuth, penddingAdsController.adsGet);
// Get admin approve ads
router.get('/approve_ads', middleware.adminAuth, approvedAdsController.adsGet);
// Get admin discard ads
router.get('/admin_delete_ads', middleware.adminAuth, deleteAdsController.deleteAds);

// ============================ All approved ads==============
router.get('/all_approved_ads', middleware.adminAuth, approvedAdsController.allApprovedAds); 

// ============================ All Verified Users==============
router.get('/all_verified_users', middleware.adminAuth, usersController.verifiedUsers); 

// ============================ All Un-Verified Users==============
router.get('/all_un_verified_users', middleware.adminAuth, usersController.unVerifiedUsers); 

// ==============================Add cat========================
router.get('/cat', middleware.adminAuth, catController.catGet);
// post method
router.post('/cat', middleware.adminAuth, catController.catPost);

// ==============================Add sub cat========================
router.get('/sub_cat', middleware.adminAuth, subCatController.subCatGet);

// post method
router.post('/sub_cat', middleware.adminAuth, subCatController.subCatPost);

// ============================== Add State ========================
router.get('/state', middleware.adminAuth, stateController.stateGet);
// post method
router.post('/state', middleware.adminAuth, stateController.statePost);
// ============================== Add city ========================
router.get('/city', middleware.adminAuth, cityController.cityGet);
// post method
router.post('/city', middleware.adminAuth, cityController.cityPost);

// ===============================Users Messages ======================
// get method
router.get('/messages', middleware.adminAuth, messageController.messageGet);
router.post('/messages', middleware.adminAuth, messageController.messagePost);

// ========================Admin Login =========================
router.get('/admin_login', loginController.loginGet);
//  Post method
router.post('/admin_login', loginController.loginPost);
// logout route
router.get('/admin_logout', logoutController.logout);

module.exports = router;
