app.factory('davosUrl', function () {

	var clientId = 'UKmuK7Wvn476Dv96xGcW4K_gwrlcgxcrf-YBUJhRsDA',
		clientSecret = 'xQ6RkafhQPWG9Fvu76AD3w',
		grantType = 'client_credentials';

	var oAuthToken = '&client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=' + grantType;
	var baseUrl = 'https://davos.app.ipreo.com/oauth/rest';

	return {
		//pass in a path like /api/sample/Flow.svc
		//get back url with path
		getUrl: function (path) {
			return baseUrl + path;
		},
		getToken: function () {
			return oAuthToken;
		}
	}

});