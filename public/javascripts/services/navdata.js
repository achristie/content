app.factory('appData', function ($http, $q) {
	var navCollection = {};

	return {
		getNavCollections: function (type) {
			if ('undefined' == typeof(navCollection[type])) {
				navCollection[type] = $http.get('/api/nav/' + type).then(function (d) {
					return d.data;
				});
			}
			
			return navCollection[type];
		}
	}	
});