app.controller('TaxonomyCtrl', function ($scope, taxonomy) {
	$scope.taxonomy = {};
	$scope.entity = {};

	taxonomy.getTaxonomy().then(function (data, status) {
		$scope.taxonomy = data.Entities[0];
		$scope.entity = data.Entities[0];
	});

	$scope.showDetail = function (item) {
		$scope.$apply(function () {
			adjustEntity(item);
		});
	};

	var adjustEntity = function (item) {
		var o = {};
		o.name = item.name;
		o.inherited = [];
		o.natural = [];


		function getProperties(item) {
			var isInherited = item.name !== o.name;

			if (item.properties) {
				item.properties.forEach(function (d, i) {
					if (isInherited) {
						o.inherited.push(d);
					} else {
						o.natural.push(d);
					}
				});
			};

			if (item.parent) {
				getProperties(item.parent);
			}
		}

		getProperties(item);

		$scope.entity = o;
		console.log($scope.entity);
	};

});