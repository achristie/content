var express = require('express');
var router = express.Router();

router.index = function (req, res, next) {
	res.render('index');
};

router.navLayout = function (req, res, next) {
	res.render('navLayout');
};

router.redirect = function (req, res, next) {
	res.redirect('/');
};

module.exports = router;
