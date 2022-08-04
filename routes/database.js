var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
//============================================================================================================
//==========================================================================================================
router.get('/checkDatabase', function(req, res, next) {
    var x = new Date()
    console.log(x);

    var day = x.getDay() ;//0-6
    var hours = x.getHours() ;
    var minutes = x.getMinutes() ;
    console.log(day);
    console.log(hours);
    console.log(minutes);

    //-------------------------------------------
    var listDrugs = [];
    //אם היום יום ראשון תכניס למערך את כל התרופות הנלקחות ביום ראשון
    if(day == 0){
        db.Days.findAll({
            where: { email: req.session.email, sunday:'1' }
        }).then(days => {

            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //אם היום יום שני תכניס למערך את כל התרופות הנלקחות ביום שני
    if(day == 1){
        db.Days.findAll({
            where: { email: req.session.email, monday:'1' }
        }).then(days => {
            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //אם היום יום שלישי תכניס למערך את כל התרופות הנלקחות ביום שלישי
    if(day == 2){
        db.Days.findAll({
            where: { email: req.session.email, tuesday:'1' }
        }).then(days => {
            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //אם היום יום רביעי תכניס למערך את כל התרופות הנלקחות ביום רביעי
    if(day == 3){
        db.Days.findAll({
            where: { email: req.session.email, wednesday:'1' }
        }).then(days => {
            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //אם היום יום חמישי תכניס למערך את כל התרופות הנלקחות ביום חמישי
    if(day == 4){
        db.Days.findAll({
            where: { email: req.session.email, thursday:'1' }
        }).then(days => {
            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //אם היום יום שישי תכניס למערך את כל התרופות הנלקחות ביום שישי
    if(day == 5){
        db.Days.findAll({
            where: { email: req.session.email, friday:'1' }
        }).then(days => {
            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //אם היום יום שבת תכניס למערך את כל התרופות הנלקחות ביום שבת
    if(day == 6){
        db.Days.findAll({
            where: { email: req.session.email, saturday:'1' }
        }).then(days => {
            for (var i =0 ; i<days.length; i++){
                listDrugs[i] = days[i].drugName;
            }

            console.log(listDrugs)
        });
    }
    //-------------------------------------------

    

});

module.exports = router;