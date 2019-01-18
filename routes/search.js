var express = require('express');
var router = express.Router();
var search = require('../models/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var type = req.query.type
  console.log("type",type)
  console.log(req.query.account)
  if(type) {
    search.query(`select * from ${type} limit 5 `,[],function(result) {
      if(req.query.account != undefined && req.query.account ){
        search.query("select * from user where account =?",[req.query.account],function(user){
          res.render("search",{
            catalog: result,
            account: req.query.account,
            username:user[0].username
          });
        })
      }else{
        res.render("search",{
          catalog: result,
          account:""
        })
      }
    })
  }
});

router.post('/loadmore',function(req,res) {
  var sql = req.body.sql
  search.query(sql,[],function(rows) {
    console.log(rows)
    res.json(rows)
  })
})

module.exports = router;