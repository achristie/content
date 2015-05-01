app.factory('davosUrl', function () {

	var clientId = 'THnXwTp5dDY4_Ale9IECx4VkBaxyoAJst5SmuQPsMhw',
		clientSecret = 'CW8hr4P1MYOt6m6OB-uNVA',
		grantType = 'client_credentials';

	var oAuthToken = '&client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=' + grantType;
	var baseUrl = 'https://davos.qx.ipreo.com/oauth/rest';

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