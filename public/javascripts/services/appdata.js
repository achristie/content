app.factory('appData', function ($http, $q) {
	var navCollection = null;

	return {
		getNavCollections: function () {
			if (navCollection == null) {
				navCollection = $http.get('/api/nav').then(function (d) {
					return d.data;
				});
			}
			
			return navCollection;
		}
	}	
});