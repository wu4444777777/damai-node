var express = require('express');
var router = express.Router();
var detail = require('../models/db')

/* GET home page. */
router.get('/', function(req, res, next) {
    var name = req.query.name
    var type = req.query.type
    var sql = `select * from ${type} where name= ?` 
    detail.query(sql,[name],function(rows) {
      if(req.query.account != undefined && req.query.account){
        detail.query("select * from user where account =?",[req.query.account],function(user){
          res.render('detail', { 
            detail: rows,
            ticketStatus: rows[0].ticketStatus,
            username:user[0].username,
            account: req.query.account
           });
        })
      }else{
        res.render('detail', { 
          detail: rows,
          ticketStatus: rows[0].ticketStatus,
          account: ""
        });
      }
    })
});

module.exports = router;
