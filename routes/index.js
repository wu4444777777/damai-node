var express = require('express');
var router = express.Router();
var index = require("../models/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.account){
    var user = req.query.account
  }
  console.log(user)
  index.query('select * from `concert` where showIndex=1;select * from `opera` where showIndex=1;select * from `sport` where showIndex=1;select * from `family`  where showIndex=1;',[],function(rows) {
    if(req.query.account != undefined && req.query.account){
      index.query("select * from user where account =?",[req.query.account],function(user){
        res.render('index', {
          concert: rows[0],
          opera: rows[1],
          match: rows[2],
          family: rows[3],
          account: req.query.account,
          username:user[0].username
        });
      })
    }else{
      res.render('index', {
        concert: rows[0],
        opera: rows[1],
        match: rows[2],
        family: rows[3],
        account:""
      })
    }
  });
});

module.exports = router;
