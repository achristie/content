var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, "/taxonomy.json"));
});

router.get('*', function (req, res, next) {
	res.status(404).send('Not Found');
});

module.exports = router;