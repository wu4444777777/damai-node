var express = require('express');
var router = express.Router();
var order =require("../models/db")

/* GET home page. */
router.get('/', function(req, res, next) {
    
    if(req.query.account != undefined && req.query.account){
      order.query("select * from user where account= ?",[req.query.account],function(user){
        res.render("orderManage",{
          account: req.query.account,
          username: user[0].username
        })
      })
    }else{
      res.render('orderManage', { account: "" });
    }
});

module.exports = router;
