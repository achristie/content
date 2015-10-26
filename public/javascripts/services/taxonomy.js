app.factory('taxonomy', function ($http) {
	var taxonomy;

	return {
		//pass in a path like /api/sample/Flow.svc
		//get back url with path
		getTaxonomy: function () {
			if (!taxonomy) {
				taxonomy = $http.get("/api/taxonomy").then(function (d) {
					return d.data;
				});
			}

			return taxonomy;
		}
	}

});