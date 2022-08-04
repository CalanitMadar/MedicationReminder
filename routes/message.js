var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');


router.get('/message', function(req, res, next) {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'caldrug@gmail.com',
            pass: 'MedicinesCalanit'
        },
    });

    var mailOptions = {
        from: 'caldrug@gmail.com',
        to: 'caldrug@gmail.com',
        subject: 'שלום לך אמא',
        text: 'hello from website of drugs of calanit madar hhhhhh',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

module.exports = router;
