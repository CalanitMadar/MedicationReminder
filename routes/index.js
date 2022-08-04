var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
//============================================================================================================
/* GET home page. display the FORM */

router.get('/', function(req, res, next) {
  // db.MayUsers.destroy({//מוחקת כל הזמן את מי שנרשם ולא הזין סיסמא ויצא מהאתר
  //   where: {
  //     email: 'calanit.cha@gmail.com'
  //   }
  // });

  if(req.session.loggedIn){
    res.render('homePage', {user: ""});//אם לא עברה חצי שעה מאז ההתחברות תישאר בדף הבית
  }
  else{//תמיד בתחילה יפתח הדף הראשי index
    res.render("index", {errorMessage:""});
  }
});

//==========================================================================================================
router.get('/learnMore', function(req, res, next) {
  res.render("learnMore");
});

//============================================================================================================
router.get('/logout', function (req, res, next) {

    req.session.loggedIn = false;
    res.render("index", {errorMessage:"disconnact"});

});



module.exports = router;


