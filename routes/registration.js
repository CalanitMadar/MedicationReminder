var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');

var Sequelize = require('sequelize');

const db = require('../models');
//-----------------------
//משתנים אלו משמשים אותי להצפנת הסיסמאות
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainText = "Hello World";
//-----------------------

let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
//==========================================================================================================
//משתמש חדש יועבר לדף שיבקש ממנו אימייל, שם פרטי ושם משפחה
router.get('/newUser', function(req, res, next) {
    res.render("newUser", {errorMessage:""});
});
//============================================================================================================
//תחילה כשנרשם משתמש חדש נבדוק האם בכלל קיים כבר משתמש כזה, אם כן נחזיר הודעת שגיאה, אחרת נשלח אותו לסיסמאות
router.post('/register', function(req, res, next) {
    let first_name = req.body.firstName;
    res.locals.user = first_name;

    defaultUser.email = req.body.gmail;//הוצאת הערכים שהוקלדו לטופס
    defaultUser.firstName = req.body.firstName;
    defaultUser.lastName = req.body.lastName;
    defaultUser.phone = req.body.phone;
    req.session.firstName=req.body.firstName;
    req.session.lastName=req.body.lastName;

    db.MayUsers.findOne({
        where: {//נבדוק אם המייל הזה כבר קיים
            email: defaultUser.email
        }
    }).then(
        result => {
            console.log(result)
            if (result != null) {//אם יש כזה מייל אז נאמר לו שכבר קיים ונחזיר לו את הדף רישום מחדש
                res.render("index", {errorMessage: "email already creating"})
            } else {//אחרת תתחיל לספור דקה כדי שיכניס את הסיסמא תוך דקה
                res.redirect("/cookie")
            }
        }
    );
});
//============================================================================================================
//cookie מתחיל לספור 60 שניות מהרגע שהמייל תקין והוא מועבר לדף של הסיסמאות
router.get('/cookie', function(req, res, next) {
    //if(req.session.loggedIn) {
    const user = res.locals.user;
    res.locals.user = user;


    res.cookie('oneMinute', 'true', {
        expires: new Date(Date.now() + 60000)//60שניות
    });
    res.render("password");
    //}
    // else{
    //     res.render("login", {errorMessage:""});
    // }
});


//============================================================================================================
router.post('/password', function (req, res, next) {
    // if (req.session.loggedIn) {

    defaultUser.passwordUser = req.body.password1;
    defaultUser.passwordToLockSite = req.body.passwordLockSite;
    let cookie = req.cookies.oneMinute;


    if (cookie == null) {//עברה דקה ולכן המשתמש יוחזר לדף index
        res.render("index", {errorMessage: "you didn't submit the form in time"});//ונעביר אותו לדף משתמש חדש שוב
    }
    else {
        bcrypt.hash(defaultUser.passwordUser, saltRounds)
            .then(hash => {
                console.log(hash);

                bcrypt.hash(defaultUser.passwordToLockSite, saltRounds)
                    .then(hashLock => {
                        console.log(hashLock);


                        var user = db.MayUsers.findOrCreate({
                            where: {
                                email: defaultUser.email
                            }
                            ,
                            defaults: {
                                firstName: defaultUser.firstName,
                                lastName: defaultUser.lastName,
                                phone: defaultUser.phone,
                                email: defaultUser.email
                            }
                        }).then(res => {
                            var passwordUser = db.Password.findOrCreate({
                                where: {
                                    email: defaultUser.email
                                }
                                ,
                                defaults: {
                                    email: defaultUser.email,
                                    passwordSite: hash,
                                    passwordLock: hashLock
                                }
                            });
                        });
                    });
            });
        res.render("login", {errorMessage: ""})
    }

    // } else {
    //     res.render("login", {errorMessage: "you are already registered"});
    //
    // }

    res.end();

});

module.exports = router;
