var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
let random;//משתנה זה מחזיק את המספר שנגריל כאשר המשתמש ירצה להחליף סיסמא

const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = "Hello World";
//============================================================================================================
router.get('/login', function(req, res, next) {
    res.render("login", {errorMessage:""});
});
//============================================================================================================
router.get('/forgetPassword', function(req, res, next) {
    res.render("forgetPassword", {message:""});
});

//==========================================================================================================
router.post('/PasswordHandling', function(req, res, next) {
    defaultUser.email = req.body.forgetEmail;
    db.Password.findOne({where: {email: defaultUser.email}}).then(result => {
        if (result != null) {
            random = Math.floor(Math.random() * 9000000000);
            res.render("EmailVerification", {message:"In the next few minutes, an email with a verification code will be sent to you"})

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'caldrug@gmail.com',
                    pass: 'MedicinesCalanit'
                },
            });

            var mailOptions = {
                from: 'caldrug@gmail.com',
                to: defaultUser.email,
                subject: 'code',
                text: ("The code is " + String(random))
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        else{
            res.render("forgetPassword", {message:"This email does not exist in the system"})
        }
    })
})
//==========================================================================================================
router.post('/changePassword', function(req, res, next) {
    let numberRandomFromUser = req.body.Code;
    if(numberRandomFromUser == random){
        res.render("updatePassword")
    }
    else {
        res.render("login", {errorMessage:"The code you entered is incorrect"});
    }

})
//==========================================================================================================
router.post('/updatePass', function(req, res, next) {

    defaultUser.passwordUser = req.body.password1;

    bcrypt.hash(defaultUser.passwordUser, saltRounds)
        .then(hash => {
            console.log(hash);


            var update = db.Password.update({passwordSite: hash}, {
                where: {
                    email: defaultUser.email
                }
            });
        });
    res.render("login", {errorMessage:""});

})
//==========================================================================================================
router.post('/homePage', function(req, res, next) {
    db.Password.findOne({where: {email: defaultUser.email}}).then(result => {
        db.MayUsers.findOne({where: {email: defaultUser.email}}).then(res1=>{
            if (result != null) {
                res.render("homePage", {user:res1.firstName + " " + res1.lastName})
            }
            else
                res.render("newUser");
        })
    })
});
//============================================================================================================
//שליחת מייל של המשתמש שמחובר כעת
router.get('/email', function (req, res, next) {
    if (req.session.loggedIn) {
        res.setHeader('Content-Type', 'application/json');
        res.send({email: defaultUser.email});
    } else {
        res.render("login", {errorMessage: ""});
    }
});
//==========================================================================================================
router.get('/goHomePage', function(req, res, next) {
    db.Password.findOne({where: {email: defaultUser.email}}).then(result => {
        db.MayUsers.findOne({where: {email: defaultUser.email}}).then(res1=>{
            if (result != null) {
                res.render("homePage", {user:res1.firstName + " " + res1.lastName})
            }
        })
    })
});
//==========================================================================================================
router.get('/returnHomePage', function(req, res, next) {
    db.Password.findOne({where: {email: defaultUser.email}}).then(result => {
        db.MayUsers.findOne({where: {email: defaultUser.email}}).then(res1=>{
            if (result != null) {
                res.render("homePage", {user:res1.firstName + " " + res1.lastName})
            }
        })
    })
})
//==========================================================================================================
router.post('/login', function (req, res, next) {
    defaultUser.email = req.body.gmail;
    let tempEmail = req.body.gmail;
    let tempPassword = req.body.passwordsite;
    req.session.email = req.body.gmail;

    //בדיקה במסד נתונים של הסיסמאות שאכן הסיסמא של הכניסה לאתר תואמת

    db.Password.findOne({where:{email:tempEmail}}).then(resultPass=> {
        if(resultPass != null) {
            var passwordFromDB = (resultPass.passwordSite);


            bcrypt.compare(tempPassword, passwordFromDB)
                .then(resultCodePass => {
                    // This will be either true or false, based on if the string
                    // matches or not.


                    db.Password.findOne({where: {email: tempEmail, passwordSite: tempPassword}}).then(result => {
                        db.MayUsers.findOne({where: {email: tempEmail}}).then(res1 => {


                            if (resultCodePass) {
                                req.session.loggedIn = true;
                                res.render("homePage", {user: res1.firstName + " " + res1.lastName})
                            } else {//אחרת תחזיר את הדף כניסה עם הודעת שגיאה ששם משתמש או סיסמא שגויים
                                req.session.loggedIn = false;
                                res.render("login", {errorMessage: "email or password incorrect password "});
                            }
                        })
                    })
                })
        }
        else{
            req.session.loggedIn = false;
            res.render("login", {errorMessage: "email or password incorrect password "});

        }
    });



});
module.exports = router;


