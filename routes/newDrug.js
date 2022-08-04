var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//============================================================================================================
//==========================================================================================================
router.get('/newDrug', function(req, res, next) {
    res.render("newDrug", {errorMessage:""});
});

//==========================================================================================================
router.post('/savaDataNewDrug', function(req, res, next) {

    console.log(req.session.email)
    console.log(req.body.nameDrug)
    console.log(req.body.hoursClock + "ccccccc")
    console.log(req.body.minutesClock+ "ccccccc")

    db.Drugs.findOrCreate({
        where: {//נבדוק אם התרופה הזו כבר קיימת
            email: req.session.email,
            drugName:req.body.nameDrug
        },
        defaults: {
            email: req.session.email,
            drugName:req.body.nameDrug
        }
    }).then(
        result1=> {
            console.log(result1)
            // if (result1 == null) {
            //     res.render("myDrugs", {errorMessage: "/////////////"})
            // }
            // else {
            var Sunday = false, Monday = false, Tuesday = false, Wednesday = false, Thursday = false, Friday = false,
                Saturday = false;
            if (req.body.Sunday == "")//אם המשתמש בחר את יום ראשון
                Sunday = true;

            if (req.body.Monday == "")//אם המשתמש בחר את יום שני
                Monday = true;

            if (req.body.Tuesday == "")//אם המשתמש בחר את יום שלישי
                Tuesday = true;

            if (req.body.Wednesday == "")//אם המשתמש בחר את יום רביעי
                Wednesday = true;

            if (req.body.Thursday == "")//אם המשתמש בחר את יום חמישי
                Thursday = true;

            if (req.body.Friday == "")//אם המשתמש בחר את יום שישי
                Friday = true;

            if (req.body.Saturday == "")//אם המשתמש בחר את יום שבת
                Saturday = true;


            db.Days.findOrCreate({
                where: {//נבדוק אם התרופה הזו כבר קיימת
                    email: req.session.email,
                    drugName: req.body.nameDrug
                },
                defaults: {
                    email: req.session.email,// מכניס לטבלה של הימים של המסד נתונים
                    drugName: req.body.nameDrug,
                    sunday: Sunday,
                    monday: Monday,
                    tuesday: Tuesday,
                    wednesday: Wednesday,
                    thursday: Thursday,
                    friday: Friday,
                    saturday: Saturday
                }
            }).then(result2 => {
                var SMS = false, Email = false, phoneCall = false;
                if (req.body.SMS == "")//אם המשתמש בחר את SMS
                    SMS = true;

                if (req.body.Email == "")//אם המשתמש בחר מייל
                    Email = true;

                if (req.body.phoneCall == "")//אם המשתמש בחר שיחה קולית
                    phoneCall = true;


                db.Alerts.findOrCreate({
                    where: {//נבדוק אם התרופה הזו כבר קיימת
                        email: req.session.email,
                        drugName: req.body.nameDrug
                    },
                    defaults: {
                        email: req.session.email,
                        drugName: req.body.nameDrug,
                        getSMS: SMS,
                        getEmail: Email,
                        getPhoneCall: phoneCall
                    }
                }).then(result3 => {
                    if (result3[1] == false) {//אם יש כבר תרופה כזאת אז לא ניתן להכניס אותה ונחזיר את עמוד התרופות
                        res.render("myDrugs", {errorMessage: "This drug already exists"})
                    } else {
                        res.render("myDrugs", {errorMessage: ""})
                    }
                })

            })
        }
    );
});
//================================================================================================
router.post('/getListHours', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.Drugs.findAll({
        where: {
            email: req.session.email
        }
    }).then(response => {
        let html =[];
        for (var i =0 ; i<response.length; i++){
            html[i] = response[i].drugName;
        }
        res.send({list: html});
    });

});
//================================================================================================
router.post('/getListHoursAndMinutes', function(req, res, next) {
    var a = req.body.arrayHoursAndMinutes;
    console.log(a+"mmmmmmmmmmmmmm")

});

module.exports = router;