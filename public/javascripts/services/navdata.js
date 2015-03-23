app.factory('navData', function ($http, $q, $state, $rootScope) {
	//promises
	var navCollection,
		group,
		subGroup,
		groups,
		subGroups;

	getCollection = function (type) {
		if ('undefined' == typeof(navCollection[type])) {
			navCollection[type] = $http.get('/api/nav/' + type).then(function (d) {
				return d.data;
			});
		}
		return navCollection[type];
	};

	//check initial url

	//detect url changes
	$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
		var pageNm = toState.name.slice(4, toState.name.length);
		if (pageNm == 'webservices' || pageNm == 'datafeeds' || pageNm == 'widgets') {

			groups = getCollection(pageNm).then(function (d) {
				return d.collections.map(function (n) { return n.collection; });
			});

			group = groups.then(function (g) {
				var idx = g.indexOf(toParams.group);
				if (idx >= 0) {
					return g[idx];
				} else {
					return [];
				}
			});

			subGroups = group.then(function (g) {
				var idx = navCollection[pageNm].collections[]
			})


			group = function (groups) {
				var idx = groups.
			}
			
			groups = getCollection(pageNm).then(function (d) {
				arr = d.collections.map(function (n) { return n.collection; });
				var idx = arr.indexOf(toParams.group);
				if ( idx >= 0) { 
					group = groups[idx];
				} else {
					group = groups[0];
				}
			});

			subGroups = getCollection(pageNm).then(function (d) {
				var idx = d.collections.map(function (n) { return n.collection; }).indexOf(toParams.group);

				if (idx >= 0) {
					return d.collections[idx].items;
				} else {
					return [];
				}
			});	
			

		}
	});



	//all of these return a deferred object
	return {
		getGroup: function () {
			return group;
		},
		getGroups: function (type) {
			var groups = [];
			if ('undefined' == typeof(navCollection[type])) {
				groups = getCollection(type).then(function (d) {
					return d.collections.map(function (d) { return d.collection; });;
				});
			} 
			return groups;
		},
		getSubGroups: function (type, group) {
			var sub = [];
			if ('undefined' == typeof(navCollection[type])) {
				sub = getCollection(type).then(function (d) {
					var idx = d.collections.map(function (n) { return n.collection; }).indexOf(group);

					if (idx >= 0) {
						return d.collections[idx].items;
					} else {
						//group not found
						return [];
					}
				});
			} 
			return sub;
		},
		getCollection: function (type) {
			return 0;
		}
	}	
});