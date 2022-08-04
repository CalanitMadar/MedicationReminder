var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
var session = require('express-session')

//========================================================================
router.get('/myDetails', function(req, res, next) {

    db.MayUsers.findOne({
        where: {
            email: req.session.email
        }

    }).then(result=>{
        res.render("myDetails", {firstName: result.firstName, lastName: result.lastName, phone:result.phone, email:result.email});
    })

});
//========================================================================
router.get('/updateDetails', function(req, res, next) {

    res.render("updateDetails"/*, {message:""}*/);

});

//========================================================================
//כאשר המשתמש בוחר לשנות את פרטיו האישיים אז נבדוק באיזה ינפוט הוא מילא פרטים חדשים ונעדכן בהתאמה
router.post('/save', function(req, res, next) {
    console.log(req.body.lastName);
    console.log(req.body.firstName);
    console.log(req.body.email);
    console.log(req.body.phone);
    if(req.body.firstName.trim() != ""){
        db.MayUsers.update({ firstName: req.body.firstName }, {
            where: {
                email: req.session.email
            }
        });
    }

    if(req.body.lastName.trim() != ""){
        db.MayUsers.update({ lastName: req.body.lastName }, {
            where: {
                email: req.session.email
            }
        });
    }

    if(req.body.email.trim() != ""){
        db.MayUsers.update({ email: req.body.email.trim() }, {
            where: {
                email: req.session.email
            }
        });
        db.Alerts.update({ email: req.body.email.trim() }, {
            where: {
                email: req.session.email
            }
        });
        db.Days.update({ email: req.body.email.trim() }, {
            where: {
                email: req.session.email
            }
        });
        db.Drugs.update({ email: req.body.email.trim() }, {
            where: {
                email: req.session.email
            }
        });
        db.Password.update({ email: req.body.email.trim() }, {
            where: {
                email: req.session.email
            }
        });
        req.session.email = req.body.email.trim();//מעדכנת את הסשן של המייל
    }

    if(req.body.phone.trim() != ""){
        db.MayUsers.update({ phone: req.body.phone.trim() }, {
            where: {
                email: req.session.email
            }
        });
    }

    db.MayUsers.findOne({
        where: {
            email: req.session.email
        }

    }).then(result=>{
        res.render("myDetails", {firstName: result.firstName, lastName: result.lastName, phone:result.phone, email:result.email});
    })//{message:"Details changed successfully"}

});

// //========================================================================
// router.post('/displayDetails', function(req, res, next) {
//
//     db.MayUsers.findOne({
//         where: {
//             email: req.session.email
//         }
//
//     }).then(result=>{
//         console.log(result.firstName);
//         console.log(result.lastName);
//         console.log(result.email);
//         console.log(result.phone);
//
//         var first_name = result.firstName;
//         var last_name = result.lastName;
//         var email = result.email;
//         var phone = result.phone;
//         //return result;
//
//     })
//});








module.exports = router;