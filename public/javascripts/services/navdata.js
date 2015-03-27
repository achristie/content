app.factory('navData', function ($http, $q, $state, $rootScope) {
	//promises
	var navCollection = {},
		groups,
		subGroups,
		group,
		subGroup;

	var getCollection = function (type) {
		if ('undefined' == typeof(navCollection[type])) {
			navCollection[type] = $http.get('/api/nav/' + type).then(function (d) {
				return d.data;
			});
		}
		return navCollection[type];
	};


	function stateChange(e, toState, toParams, fromState, fromParams) {
		var pageNm = toState.name.slice(4, toState.name.length);

		if (pageNm == 'webservices' || pageNm == 'datafeeds' || pageNm == 'widgets') {
			var col = {};

			groups = getCollection(pageNm).then(function (d) {
				col = d;
				return d.collections.map(function (n) { return n.collection; });
			});

			group = groups.then(function (g) {
				var idx = g.indexOf(toParams.group);
				if (idx >= 0) {
					return g[idx];
				} else {
					return g[0];
				}
			});

			subGroups = group.then(function (g) {
				var idx = col.collections.map(function (d) { return d.collection; }).indexOf(g);
				return col.collections[idx].items;
			});

			subGroup = subGroups.then(function (sg) {
				var idx = sg.indexOf(toParams.subGroup);

				if (idx >= 0) {
					return sg[idx];
				} else {
					return sg[0];
				}
			});

			//check that subGroup and group exist, otherwise $state.go
			subGroup.then(function (sg) {
				group.then(function (g) {
					if (toParams.group !== g || toParams.subGroup !== sg) {
						$state.go(toState, {group: g, subGroup: sg});
					}
				});
			});
		}
	};


	return {
		onStateChange: function (e, toState, toParams, fromState, fromParams) {
			stateChange(e, toState, toParams, fromState, fromParams);
			return;
		},
		getGroup: function () {
			//promise
			return group;
		},
		getGroups: function () {
			//promise
			return groups;
		},
		getSubGroups: function (g) {
			//promise
			if (!g) {
				return subGroups;
			} else {
				return getCollection($state.current.name.slice(4, 400)).then(function (d) {
					var idx = d.collections.map(function (n) { return n.collection; }).indexOf(g);

					if (idx >= 0) {
						return d.collections[idx].items;
					} else {
						return [];
					}
				});
			}
		},
		getSubGroup: function () {
			//promise
			return subGroup;
		}
	}	
});