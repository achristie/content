app.factory('ws', function ($http, $q, davosUrl) {
	var getPkgJson = function (subGroup) {
		return $http.get('/api/packages/webservices/' + subGroup + '/package.json');
	};

	var getRmMd = function (subGroup) {
		return $http.get('/api/packages/webservices/' + subGroup + '/readme.md');
	};

	var getDavosDescription = function (subGroup) {
		var url = davosUrl.getUrl('/api/Sample/' + subGroup + '.svc');

		url = url + '/$description?$format=json&$callback=JSON_CALLBACK' + davosUrl.getToken();
		//var url = 'https://davos.app.ipreo.com/rest/api/Sample/' + subGroup + '.svc/$description?$format=json&$callback=JSON_CALLBACK';

		return $http.jsonp(url);
	};

	return {
		getWsInfo: function (subGroup) {
			return $q.all([
				getPkgJson(subGroup),
				getRmMd(subGroup),
				getDavosDescription(subGroup)
			]);
		},
		getPackageJson: function (subGroup) {
			return getPkgJson(subGroup);
		},
		getReadmeMd: function (subGroup) {
			return getRmMd(subGroup);
		},
		getDescription: function (subGroup) {
			return getDavosDescription(subGroup);
		}
	}
});