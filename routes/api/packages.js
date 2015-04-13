var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/webservices/:subGroup/package.json', function (req, res, next) {
	res.sendFile(path.join(__dirname, "../../packages/webservices/" + req.params.subGroup + "/package.json"));
});

router.get('/webservices/:subGroup/readme.md', function (req, res, next) {
	res.sendFile(path.join(__dirname, "../../packages/webservices/" + req.params.subGroup + "/readme.md"));
});

router.get('*', function (req, res, next) {
	res.status(404).send('Package not found');
});

module.exports = router;