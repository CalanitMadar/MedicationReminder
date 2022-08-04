var express = require('express');
var router = express.Router();
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var Sequelize = require('sequelize');
const db = require('../models');
//============================================================================================================
//==========================================================================================================
router.get('/myDrugs', function(req, res, next) {
    console.log("jggggggggggggg")
    res.render("myDrugs", {errorMessage:""});
});
//==========================================================================================================
router.post('/listMyDrugs', function(req, res, next) {
console.log("calanit madar")
    res.setHeader('Content-Type', 'application/json');
    db.Drugs.findAll({
        where: {
            email: req.session.email
        }
    }).then(response => {
        let html =[];
        for (var i =0 ; i<response.length; i++){
            html[i] = response[i].drugName;
            console.log(response[i].drugName+ "jjjjjjjjjjjjjjj" + i);
        }
        console.log(html);
        res.send({list: html});
    });
});
//==========================================================================================================
router.post('/remove', function(req, res, next) {
    console.log("lllllllllllllllllllll")
    console.log(req.body.email)
    console.log(req.body.drugName)
    console.log("lllllllllllllllllllll")
    db.Drugs.destroy({
        where: {
            email: req.body.email, drugName: req.body.drugName
        }
    }).then(
        db.Days.destroy({
        where: {
            email:req.body.email, drugName: req.body.drugName
        }
    }).then(
        db.Alerts.destroy({
        where: {
            email: req.body.email, drugName: req.body.drugName
        }
    })))
})

module.exports = router;