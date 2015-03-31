app.factory('navData', function ($http, $q, $state, $rootScope) {
	//promises
	var navCollection = {},
		currentCollection;

	var getCollection = function (type) {
		if ('undefined' == typeof(navCollection[type])) {
			navCollection[type] = $http.get('/api/nav/' + type).then(function (d) {
				var a = [];
				$.each(d.data.collections, function (k, v) {
					var arr = [],
						g = new Group(v);

					$.each(v.items, function (k, v) {
						arr.push(new SubGroup(v));
					});
					g.items = arr;
					a.push(g);
				});
				return a;
			});
		}
		return navCollection[type];
	};

	Group = function (d) {
		var self = this;

		self.name = d.collection;
		self.isActive = false;
		self.isOpen = false;
		self.items = [];
	}

	SubGroup = function (d) {
		var self = this;

		self.name = d;
		self.isActive = false;
	}

	function toggleActive(groupName, subGroupName) {
		//toggle isActive property
		currentCollection.then(function (d) {
			var idx = d.map(function (d) { return d.name; }).indexOf(groupName);

			if (idx >= 0) {
				var i = d[idx].items.map(function (d) { return d.name; }).indexOf(subGroupName);

				if (i >= 0) {
					d[idx].items[i].isActive = !d[idx].items[i].isActive;
					d[idx].isActive = !d[idx].isActive;
				}
			}
		});

	};

	function stateChange(e, toState, toParams, fromState, fromParams) {
		var pageNm = toState.name.slice(8, toState.name.length);

		if (pageNm == 'webservices' || pageNm == 'datafeeds' || pageNm == 'widgets') {
			
			//on state change we have to make sure the correct group and subgroup are marked as active.
			currentCollection = getCollection(pageNm).then(function (d) {
				
				return d;
			});

			currentCollection.then(function (d) {
				toggleActive(fromParams.group, fromParams.subGroup);
				var idx = d.map(function (e) { return e.name; }).indexOf(toParams.group);

				if (idx == -1) {
					var group = d[0].name,
						sg = d[0].items[0].name;

					$state.go(toState, {group: group, subGroup: sg});
				} else {
					var i = d[idx].items.map(function (d) { return d.name;}).indexOf(toParams.subGroup);

					if (i == -1) {
						var sg = d[idx].items[0];

						$state.go(toState, {group: d[idx].name, subGroup: sg });
					}
				}

				toggleActive(toParams.group, toParams.subGroup);
			});
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