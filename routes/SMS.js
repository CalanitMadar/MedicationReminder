//////////////////////////////////////////
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');


router.get('/SMS', function(req, res, next) {

    res.render('SMS', );
});

module.exports = router;
