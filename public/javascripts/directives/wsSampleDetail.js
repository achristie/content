app.directive('ipreoWsSampleDetail', function ($http, $state, davosUrl) {

	var controller = ['$scope', function ($scope) {
	
	}];

	var link = function (scope, ele, attrs) {
		scope.s = null;

		Sample = function (o) {
			var self = this;

			self.name = o.name;
			self.params = o.params;
			self.description = o.description;
			self.isQueryable = false;

			self.queryString = getQueryString(self.params);
			self.result = {};

			getResult(self.queryString).then(function (d) { 
				self.result = d.data; 
			});
		};

		function getQueryString(p) {
			var o = {};

			$.each(p, function (i, v) {
				o[v.name] = v.defaultValue;
			});
			return $.param(o);
		}

		function getResult(q) {
			var url = davosUrl.getUrl('/api/Sample/' + $state.params.subGroup + '.svc');
			var tkn = davosUrl.getToken();

			url = url + '/?' + q + '&$callback=JSON_CALLBACK' + tkn;
			//scope.s.isQueryable = false;
			return $http.jsonp(url);
		}

		scope.$watch(function () {
			return scope.sample;
		}, function (n, o) {
			if (n) {
				scope.s = new Sample(n);
			}
		});

		scope.$watch(function () {
			if (scope.s) {
				return scope.s.params;
			}
		}, function (n, o) {
			//params changed, allow querying
			if (n) {
				scope.s.isQueryable = true;
				
				//update query string
				scope.s.queryString = getQueryString(scope.s.params);
			}


		}, true);

		scope.clickQuery = function () {
			getResult(scope.s.queryString).then(function (d) {
				scope.s.result = d.data;
			});
		};

	};

	return {
		restrict: 'E',
		scope: {
			sample: '='
		},
		templateUrl: '/partials/wsSampleDetail',
		controller: controller,
		link: link
	}
});