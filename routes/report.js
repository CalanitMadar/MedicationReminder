var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
let defaultUser = {};//משתנה שיחזיק את הערכם שמתקבלים בשדות של הטופס
var html =[];

//============================================================================================================
//==========================================================================================================
router.get('/report', function(req, res, next) {
    res.render("report", {errorMessage:""});
});
//==========================================================================================================
router.post('/getReportList', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.Drugs.findAll({
        where: {
            email: req.session.email
        }
    }).then(response => {

        for(var i=0; i<response.length; i++) {
            html[i] = new Array(10);
            html[i][0] = response[i].drugName;
        }
        res.send({list: html});
    })
});

//==========================================================================================================
router.post('/showTable', function(req, res, next) {
    db.Days.findAll({
        where: {
            email: req.session.email
        }
    }).then(response => {

        // for(var i=0; i<response.length; i++) {
        //
        //     html[0][i] += response[i].sunday;
        //     html[1][i] += response[i].monday;
        //     html[2][i] += response[i].tuesday;
        //     html[3][i] += response[i].wednesday;
        //     html[4][i] += response[i].thursday;
        //     html[5][i] += response[i].friday;
        //     html[6][i] += response[i].saturday;
        //     console.log(html[0][i])
        //     console.log(html[1][i])
        //     console.log(html[2][i])
        //     console.log(html[3][i])
        //     console.log(html[4][i])
        //     console.log(html[5][i])
        //     console.log(html[6][i])
        // }
//לטפללללל
        res.send({list: html});
    })
});



module.exports = router;