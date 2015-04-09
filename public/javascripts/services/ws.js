app.factory('ws', function ($http) {
	return {
		getPackageJson: function (subGroup) {
			return $http.get('/api/packages/webservices/' + subGroup + '/package.json');
		}
	}
});