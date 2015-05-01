app.directive('ipreoWsSampleDetail', function () {
	
	/*(var controller = app.controller('WebServSampleCtrl', function ($scope) {

});*/

	var controller = ['$scope', 'davosUrl', '$state', '$http', function ($scope, davosUrl, $state, $http) {
		Sample = function (o) {
			var self = this;

			self.name = o.name;
			self.params = o.params;
			self.isQueryable = false;
			
			var o = getParsedParams(self.params);
			self.parsedParams = o.parsedParams;
			self.trueKeyNames = o.trueKeyNames;

			self.queryString = getQueryString(self);
			self.result = {};
			getResult(self.queryString).then(function (d) { 
				self.result = d.data; 
			});
		};

		function getParsedParams(params) {
			var p = parseQueryString(params),
				o = {};

				//o is returned
				o.trueKeyNames = {};
				o.parsedParams = {};

				$.each(p, function (k, v) {
					o.trueKeyNames[k] = k;

					if (k.substring(0, 1) == '$') {
						var t = k;
						k = k.slice(1, k.length);

						o.trueKeyNames[k] = t;
					}

					o.parsedParams[k] = {value: v};
				});

			return o;
		}

		function getQueryString(s) {
			var o = {};

			$.each(s.parsedParams, function (k, v) {
				o[s.trueKeyNames[k]] = v.value;
			});
			return $.param(o);
		}

		function getResult(q) {
			var url = davosUrl.getUrl('/api/Sample/' + $state.params.subGroup + '.svc');
			var tkn = davosUrl.getToken();

			url = url + '/?' + q + '&$callback=JSON_CALLBACK' + tkn;

			return $http.jsonp(url);
		}

		$scope.$watch(function () {
			if ($scope.sample) {
				return $scope.sample.parsedParams;
			}
		}, function (n, o) {
			//allow querying
		}, true);

		$scope.clickSample = function (s) {
			$scope.sample = new Sample(s);
		};

		$scope.clickBack = function () {
			$scope.sample = null;
		};

		$scope.clickQuery = function () {
			getResult($scope.sample.queryString).then(function (d) {
				$scope.result = d.data;
			});
		};

		var parseQueryString = function (q) {
			var match,
				pl = /\+/g, 
				search = /([^&=]+)=?([^&]*)/g,
				decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
				query  = q;

			urlParams = {};
			while (match = search.exec(query)) {
				urlParams[decode(match[1])] = decode(match[2]);
			}

			return urlParams;
		};

	}];

	var link = function (scope, ele, attrs) {
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