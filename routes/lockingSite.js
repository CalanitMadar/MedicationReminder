var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס

//-------------------------------
//אבטחת הסיסמא של נעילת האתר
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = "Hello World";
//-------------------------------

//============================================================================================================
//==========================================================================================================
router.get('/lockingSite', function(req, res, next) {
    res.render("lockingSite", {errorMessage:""});
});
//==========================================================================================================
router.post('/locking', function(req, res, next) {

    db.Password.findOne({where: {email: req.session.email}}).then(resultPass => {
        var passwordFromDB = (resultPass.passwordLock);

        bcrypt.compare(req.body.lockingPassword, passwordFromDB)
            .then(result => {
                // This will be either true or false, based on if the string
                // matches or not.


                if (result) {

                    //כאן אני צריכה לנעול את הכפתורים שגורמים לעריכה של האתר
                    db.MayUsers.findOne({where: {email: req.session.email}}).then(result1 => {
                        if (result1) {
                            var a = (result1.firstName)
                            var b = (result1.lastName)

                            res.render("homePageLock", {user: a + " " + b})
                        }

                    })
                }
                else {
                    res.render("lockingSite", {errorMessage: "The password is incorrect"});
                }

            })
    });
});



//==========================================================================================================

router.get('/openSite', function(req, res, next) {
    res.render("unlockSite", {errorMessage:""});
});
//==========================================================================================================
router.post('/toOpenSite', function(req, res, next) {
    db.Password.findOne({where: {email: req.session.email}}).then(resultPass => {
        var passwordFromDB = (resultPass.passwordLock);

        bcrypt.compare(req.body.unlockingPassword, passwordFromDB)
            .then(result => {
                // This will be either true or false, based on if the string
                // matches or not.


                if (result) {

                    db.MayUsers.findOne({where: {email: req.session.email}}).then(result1 => {
                        if (result1) {
                            var a = (result1.firstName)
                            var b = (result1.lastName)

                            res.render("homePage", {user: a + " " + b})
                        }

                    })
                }
                else {
                    res.render("homePageLock", {errorMessage: "The password is incorrect"});
                }

            })
    });
});

module.exports = router;
