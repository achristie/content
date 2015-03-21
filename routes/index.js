var express = require('express');
var router = express.Router();


router.index = function (req, res, next) {
	res.render('index');
};

router.partials = function (req, res, next) {
	var name = req.params.name;
	res.render('partials/' + name);
};

router.recorder = function (req, res, next) {
	res.render('recorder');
};

router.redirect = function (req, res, next) {
	res.redirect('/');
};

module.exports = router;
