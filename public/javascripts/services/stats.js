app.factory('stats', function ($http) {
	var stats;

	return {
		//pass in a path like /api/sample/Flow.svc
		//get back url with path
		getStats: function () {
			if (!stats) {
				stats = $http.get("/api/stats").then(function (d) {
					return d.data;
				});
			}

			return stats;
		}
	}

});