var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
//============================================================================================================
//==========================================================================================================
router.get('/stockMedication', function(req, res, next) {
        res.render("stockMedication", {errorMessage: ""});
});
//==========================================================================================================
router.post('/saveStockMedication', function(req, res, next) {
//מציגה למשתמש את כל התרופות שקיימות
//ומעדכנת את המסד נתונים כל כמה זמן להזכיר למשתמש שהתרופה עומדת להיגמר

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


    console.log(req.session.email)
    console.log(req.body.listDrugs)
    console.log(req.body.numberOfStockMedication)
    console.log(req.body.remind)
    console.log(req.body.alertTime)
    console.log(req.body.type_alert)

    if(req.body.listDrugs == undefined)//פקודה זו על מנת למנוע שגיאה כאשר המשתמש עדיין לא הכניס ערכים
        req.body.listDrugs = '0';

    db.StockMedication.findOrCreate({
        where: {//נבדוק אם המייל הזה כבר קיים
            email: req.session.email,
            drug_name:req.body.listDrugs
        },
        defaults: {
            email: req.session.email,
            drug_name:req.body.listDrugs,
            amount:req.body.numberOfStockMedication,
            quantity_remind:req.body.remind,
            alert_time:req.body.alertTime,
            reminder_type:req.body.type_alert
        }
    }).then(
        result => {
            console.log(result)


            if (result[1] == false) {//אם כבר קיימת התראה כזאת אז רק נעדכן את השינויים
                db.StockMedication.update({
                    amount:req.body.numberOfStockMedication,
                    quantity_remind:req.body.remind,
                    alert_time:req.body.alertTime,
                    reminder_type:req.body.type_alert }, {
                    where: {
                        email: req.session.email,
                        drug_name:req.body.listDrugs
                    }
                });
            }
             // res.render("homePage", {user:req.session.firstName + " " + req.session.lastName})
        }
    )
});

//==========================================================================================================
router.post('/ok', function(req, res, next) {
    console.log("vcvcvcvcvcvcvcvcvcvcv")
    res.render("homePage", {user:req.session.firstName + " " + req.session.lastName})
});



module.exports = router;