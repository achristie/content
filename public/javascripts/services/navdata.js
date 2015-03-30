app.factory('navData', function ($http, $q, $state, $rootScope) {
	//promises
	var navCollection = {},
		currentCollection;

	var getCollection = function (type) {
		if ('undefined' == typeof(navCollection[type])) {
			navCollection[type] = $http.get('/api/nav/' + type).then(function (d) {
				return d.data.collections;
			});
		}
		return navCollection[type];
	};


	function stateChange(e, toState, toParams, fromState, fromParams) {
		var pageNm = toState.name.slice(8, toState.name.length);

		if (pageNm == 'webservices' || pageNm == 'datafeeds' || pageNm == 'widgets') {
			
			currentCollection = getCollection(pageNm).then(function (d) {
				return d;
			});

			currentCollection.then(function (d) { 
				var idx = d.map(function (e) { return e.collection; }).indexOf(toParams.group);

				if (idx == -1) {
					var group = d[0].collection,
						sg = d[0].items[0];

					$state.go(toState, {group: group, subGroup: sg});
				} else {
					//group exists, does subgroup?
					var i = d[idx].items.indexOf(toParams.subGroup);

					if (i == -1) {
						var sg = d[idx].items[0];

						$state.go(toState, {group: d[idx].collection, subGroup: sg});
					}
				}
			})
		}
	};


	return {
		onStateChange: function (e, toState, toParams, fromState, fromParams) {
			stateChange(e, toState, toParams, fromState, fromParams);
			return;
		},
		getCurrentCollection: function () {
			//promise
			return currentCollection;
		}
	}	
});