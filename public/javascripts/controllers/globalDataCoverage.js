app.controller('GlobalDataCoverageCtrl', function ($scope, stats, $interval) {
	$scope.activeTypeName;
	$scope.activeType;
	$scope.stop = false;
	$scope.breakout = 'contacts';
	var cycle;

	stats.getStats().then(function (d) {
		$scope.stats = d;
		
		$scope.activeTypeName = d.InstitutionCounts[0].type;
		$scope.activeType = d.InstitutionCounts[0];

		$scope.cycleTypes();
		
	});

	$scope.clickType = function (instCount) {
		$scope.activeTypeName = instCount.type;
		$scope.activeType = instCount;
		$scope.stop = true;
	};

	$scope.clickBreakout = function (b) {
		$scope.breakout = b;
	};

	$scope.getRegionClass = function (region) {
		if (region == "Americas") { return "americas"; }
		if (region == "Europe") { return "europe"; }
		if (region == "Asia-Pacific") { return "apac"; }
		if (region == "Middle East & Africa") { return "mea"; }
	};

	$scope.getSum = function (arr, type) {
		var sum = 0;
		arr = arr.map(function (d) { return d[type]; });
		$.each(arr, function (i, v) {
			sum += v;
		});
		return sum;
	};

	$scope.stopCycle = function () {
		$interval.cancel(cycle);
		$scope.stop = true;
	};

	$scope.cycleTypes = function () {
		var len = $scope.stats.InstitutionCounts.length;
		var count = 1;

		cycle = $interval(function () {
			if (!$scope.stop) {
				$scope.activeType = $scope.stats.InstitutionCounts[count % len];
				$scope.activeTypeName = $scope.stats.InstitutionCounts[count % len].type;
				count++;
			} else {
				$scope.stopCycle();
			}
		}, 5000)
	};

	$scope.$on('$destroy', function () {
		$scope.stopCycle();
	});
});