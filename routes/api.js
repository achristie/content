var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	console.log('hey');
});

router.get('/nav', function (req, res, next) {
	res.json({
		"collections": [
			{
				"collection": "Ownership",
				"items": ["EqInvestorOwnership", "EqSecurityOwnership", "AdvancedOwnership", "Others..."]
			},
			{
				"collection": "Contacts",
				"items": ["ContactOwnership", "Contact411", "etc", "testing.."]
			},
			{
				"collection": "Investors",
				"items": ["EqInvestorOwnership", "AdvancedOwnership", "HistoricalInvestorOwnership"]
			},
			{
				"collection": "Events",
				"items": ["MeetingSchedules", "EqSecurityOwnership", "AdvancedOwnership", "Others..."]
			}
		]
	});
});

module.exports = router;
