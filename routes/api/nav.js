var express = require('express');
var router = express.Router();

router.get('/webservices', function (req, res, next) {
	res.json({
		"collections": [
			{
				"collection": "Get Started",
				"icon": "arrow-circle-right",
				"items": ["About", "REST Protocol", "Authentication", "Examples"]
			},
			{
				"collection": "Ownership",
				"items": ["InvestorProfileEQ", "InvestorProfileFI"]
			},
			{
				"collection": "Contacts",
				"items": ["Contact411"]
			},
			{
				"collection": "Investors",
				"items": ["InvestorLookupEQ", "InvestorLookupFI", "HistoricalInvestorOwnership"]
			},
			{
				"collection": "Deals",
				"items": ["DealProfileEQ", "DealCalendarEQ"]
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
