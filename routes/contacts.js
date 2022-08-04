var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
//============================================================================================================
//==========================================================================================================
router.post('/getContactList', function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');
    db.myContact.findAll({
        where: {
            emailUser: req.session.email
        }
    }).then(response => {
        var html =[];

        for(var i=0; i<response.length; i++) {
            html[i] = new Array(5);
            html[i][0] = response[i].firstName;
            html[i][1] = response[i].lastName;
            html[i][2] = response[i].phone;
            html[i][3] = response[i].emailContact;
            html[i][4] = response[i].type;
        }

        res.send({list: html});
    });
});

//==========================================================================================================
router.get('/contacts', function(req, res, next) {
    res.render("contacts", {errorMessage:""});
    res.redirect("/getContactList");

});
//==========================================================================================================
//==========================================================================================================
//הוספת איש קשר חדש
router.get('/newContact', function(req, res, next) {
    res.render("newContact", {errorMessage:""});

});
//==========================================================================================================
//הוספת איש קשר חדש
router.post('/registerContact', function(req, res, next) {

    defaultUser.email = req.body.gmail;//הוצאת הערכים שהוקלדו לטופס
    defaultUser.firstName = req.body.firstName;
    defaultUser.lastName = req.body.lastName;
    defaultUser.phone = req.body.phone;

    console.log(req.body.gmail)
    console.log(req.body.firstName)
    console.log(req.body.lastName)
    console.log(req.body.phone)
    console.log((req.body.selectType))


    db.myContact.findOrCreate({
        where: {//נבדוק אם המייל הזה כבר קיים
            emailUser: req.session.email,
            emailContact:defaultUser.email
        },
        defaults: {
            firstName: defaultUser.firstName,
            lastName: defaultUser.lastName,
            phone: defaultUser.phone,
            emailContact: defaultUser.email,
            emailUser: req.session.email,
            type:req.body.selectType
        }
    }).then(
        result => {
            console.log(result)

            if (result[1] == false) {//אם יש כבר תרופה כזאת אז לא ניתן להכניס אותה ונחזיר את עמוד התרופות
                res.render("contacts", {errorMessage: "This contact already exists"})
            } else {
                res.render("contacts", {errorMessage: ""})
                // res.redirect("/addAlerts")
            }
        }
    );
});
//==========================================================================================================
// //============================================================================================================
// // שליחת מייל של המשתמש שמחובר כעת ושל האיש קשר שברצונו למחוק
// router.get('/email', function (req, res, next) {
//     if (req.session.loggedIn) {
//         res.setHeader('Content-Type', 'application/json');
//         res.send({email: defaultUser.email});
//     } else {
//         res.render("login", {errorMessage: ""});
//     }
// });
//==========================================================================================================
//מחיקת איש קשר קיים
router.post('/deleteContact', function(req, res, next) {
    db.myContact.destroy({
        where: {
            emailUser: req.body.emailUser, emailContact: req.body.emailContact
        }
    })
});
//==========================================================================================================
router.get('/addAlerts', function(req, res, next) {
    res.render("addAlertContact", {errorMessage:""});
});
//==========================================================================================================
router.post('/checkAlerts', function(req, res, next) {
    if(req.body.flexCheck1 == "")
    {}//אם המשתמש בחר באופציה ראשונה עלי להגדיר לה לקבל את כל ההתראות כמו המשתמש
    if(req.body.flexCheck2 == "")
    {}//אם המשתמש בחר באופציה שניה עלי להגדיר לו לקבל סיכום פעם בשבוע למייל
    if(req.body.flexCheck3 == "")
    {}//אם המשתמש בחר באופציה שלישית עלי להגדיר לו לקבל סיכום פעם בחודש


});

module.exports = router;