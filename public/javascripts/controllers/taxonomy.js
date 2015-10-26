app.controller('TaxonomyCtrl', function ($scope, taxonomy) {
	$scope.taxonomy = {};

	taxonomy.getTaxonomy().then(function (data, status) {
		$scope.taxonomy = data;
	});

});