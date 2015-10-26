var express = require('express');
var router = express.Router();
var nav = require('./api/nav');
var packages = require('./api/packages');
var stats = require('./api/stats');
var taxonomy = require('./api/taxonomy');

router.use('/nav', nav);
router.use('/packages', packages);
router.use('/stats', stats);
router.use('/taxonomy', taxonomy);
router.get('*', function (req, res, next) {
	res.send(404, '404 - API Not Found');
});

module.exports = router;
