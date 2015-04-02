app.factory('navData', function ($http, $q, $state, $rootScope) {
	//promises
	var navCollection = {},
		currentCollection,
		currentActives = {};

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

	function inActivateAll() {
		currentCollection.then(function (d) {
			$.each(d, function (i, v) {
				v.isActive = false;
				$.each(v.items, function (i, v) {
					v.isActive = false;
				})
			})
		})
	}

	function getValidParams(col, group, subGroup) {
		var idx = col.map(function (d) { return d.name; }).indexOf(group);

		if (idx == -1) {
			var g = col[0].name,
				sg = col[0].items[0].name;

			return {group: g, subGroup: sg};
		} else {
			var i = col[idx].items.map(function (d) { return d.name; }).indexOf(subGroup);

			if (i == -1) {
				var sg = col[idx].items[0].name;

				return {group: group, subGroup: sg};
			}
		}
		return {group: group, subGroup: subGroup};
	}

	function stateChange(e, toState, toParams, fromState, fromParams) {
		var toPage = toState.name.slice(8, toState.name.length),
			fromPage = toState.name.slice(8, fromState.name.length);

		if (toPage == 'webservices' || toPage == 'datafeeds' || toPage == 'widgets') {

			if (currentActives.hasOwnProperty(toPage) && toParams.group == null && toParams.subGroup == null) {
				$state.go(toState, currentActives[toPage]);
				return;
			}

			currentCollection = getCollection(toPage).then(function (d) {
				var param = getValidParams(d, toParams.group, toParams.subGroup),
					isParamValid = toParams.group == param.group && toParams.subGroup == param.subGroup ? true : false;
				
				//redirect if invalid parameters
				if (!isParamValid) {
					$state.go(toState, param);
					return;
				}

				//inActivate all
				inActivateAll();

				//save actives per page so if the previous state can be reloaded if navigating via menu bar
				if (!currentActives.hasOwnProperty(toPage)) {
					currentActives[toPage] = {};
				}
				currentActives[toPage] = param;
				console.log(currentActives);
				toggleActive(param.group, param.subGroup);

				return d;
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