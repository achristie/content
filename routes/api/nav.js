var express = require('express');
var router = express.Router();

router.get('/webservices', function (req, res, next) {
	res.json({
		"collections": [
			{
				"collection": "Ownership",
				"items": ["EqInvestorOwnership", "InvestorProfileEQ", "AdvancedOwnership", "Others..."]
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

router.get('/datafeeds', function (req, res, next) {
	res.json({
		"collections": [
			{
				"collection": "Investor",
				"items": ["EqInstitution", "EqInstitutionAnalytics", "EqFund", "EqFundAnalytics"]
			},
			{
				"collection": "Contacts",
				"items": ["ContactOwnership", "Contact411", "etc", "testing.."]
			},
			{
				"collection": "Securities",
				"items": ["EqSecurity", "EqSecurityAnalytics", "FiSecurity", "FiSecurityAnalytics"]
			}
		]
	});
});

module.exports = router;
