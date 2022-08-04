var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
//============================================================================================================
//==========================================================================================================
router.get('/imageDrug', function(req, res, next) {
    res.render("imageDrug");
});

module.exports = router;
