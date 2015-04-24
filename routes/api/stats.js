var express = require('express');
var router = express.Router();

router.get('*', function (req, res, next) {
	res.json({
		"InstitutionCounts": [
			{
				"type": "Buy-Side Equity",
				"data": [
					{ "region": "Americas", "contacts": 51970, "firms": 17910 },
					{ "region": "Europe", "contacts": 27405, "firms": 8830 },
					{ "region": "Asia-Pacific", "contacts": 15695, "firms": 6225 },
					{ "region": "Middle East & Africa", "contacts": 4010, "firms": 1655 }
				]
			},
			{
				"type": "Buy-Side Fixed Income",
				"data": [
					{ "region": "Americas", "contacts": 32300, "firms": 16785 },
					{ "region": "Europe", "contacts": 15595, "firms": 3830 },
					{ "region": "Asia-Pacific", "contacts": 5060, "firms": 1685 },
					{ "region": "Middle East & Africa", "contacts": 2480, "firms": 785 }
				]
			},
			{
				"type": "Buy-Side Derivative",
				"data": [
					{ "region": "Americas", "contacts": 20340, "firms": 5720 },
					{ "region": "Europe", "contacts": 9450, "firms": 1810 },
					{ "region": "Asia-Pacific", "contacts": 1610, "firms": 510 },
					{ "region": "Middle East & Africa", "contacts": 495, "firms": 125 }
				]
			},
			{
				"type": "Hedge Funds",
				"data": [
					{ "region": "Americas", "contacts": 17715, "firms": 4415 },
					{ "region": "Europe", "contacts": 3690, "firms": 1005 },
					{ "region": "Asia-Pacific", "contacts": 2780, "firms": 820 },
					{ "region": "Middle East & Africa", "contacts": 335, "firms": 100 }
				]
			},
			{
				"type": "Sell-Side Equity",
				"data": [
					{ "region": "Americas", "contacts": 9425, "firms": 1380 },
					{ "region": "Europe", "contacts": 6665, "firms": 690 },
					{ "region": "Asia-Pacific", "contacts": 12665, "firms": 305 },
					{ "region": "Middle East & Africa", "contacts": 0, "firms": 0 }
				]
			},

		],
		"IssuerCounts": [
			{ "region": "Americas", "issuers": 5889, "contacts": 22625 },
			{ "region": "Europe", "issuers": 3311, "contacts": 12866 },
			{ "region": "Asia-Pacific & MENA", "issuers": 6156, "contacts": 20078 },
		],
		"GlobalCounts": {
			"firms": 49000,
			"instContacts": 146000
		},
		"ProxyContacts": {
			"count": 2300,
			"primary": 550,
			"secondary": 1800
		},
		"Deltas": {
			"Quarter": {
				"buyside": {
					"removed": { "firm": 260, "contact": 2039 },
					"added": { "firm": 1311, "contact": 5606 }
				},
				"sellside": {
					"removed": { "firm": 68, "contact": 885 },
					"added": { "firm": 50, "contact": 1567 }
				}
			},
			"Annual": {
				"buyside": {
					"removed": { "firm": 1044, "contact": 9610 },
					"added": { "firm": 4503, "contact": 23071 }
				},
				"sellside": {
					"removed": { "firm": 122, "contact": 4123 },
					"added": { "firm": 209, "contact": 6995 }
				}
			}
		}
	});
});

module.exports = router;
