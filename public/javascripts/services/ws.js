app.factory('ws', function ($http, $q, davosUrl) {
	var cache = {};

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

		return $http.jsonp(url).then(function (d) {
			//get unique request parameters

			var arr = [],
			//ignore params which are part of Ipreo Rest Protocol and thus not service specific
				lst = ['$top', '$skip', '$format', '$orderby'];

			$.each(d.data.Components, function (i, v) {
				$.each(v.RequestParameters, function (i, v) {
					if (lst.indexOf(v.Name) == -1) {
						lst.push(v.Name);
						arr.push(v);
					}
				})
			})

			d.data['requestParams'] = arr;

			return d;
		});
	};

	return {
		getWsInfo: function (subGroup) {
			//TODO: don't add to cache if request fails.
			if (!cache.hasOwnProperty(subGroup)) {
				cache[subGroup] = $q.all([
					getPkgJson(subGroup),
					getRmMd(subGroup),
					getDavosDescription(subGroup)
				]);
			}
			return cache[subGroup];
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