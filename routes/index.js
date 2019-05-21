var express = require('express');
var router = express.Router();
var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");


HandlerGenerator = new HandlerGenerator();
router.get('/', middleware.checkToken, HandlerGenerator.index);
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.post( '/login', HandlerGenerator.login);


module.exports = router;
