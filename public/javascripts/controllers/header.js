app.controller('HeaderCtrl', function ($scope, $state) {
	pageNames = ['', 'Web Services', 'Data Feeds', 'Widgets'];

	$scope.$watch(function () {
		return $state.current.name;
	}, function (n, o) {
		setPageName(n);
	});

	$scope.getClass = function (pgNm) {
		if (pgNm === pageNames[0]) { return "text-content"; }
		if (pgNm === pageNames[1]) { return "text-ws"; }
		if (pgNm === pageNames[2]) { return "text-df"; }
		if (pgNm === pageNames[3]) { return "text-wdgt"; }
	};

	function setPageName(state) {
		if (state == "app") { $scope.pageName = pageNames[0]; }
		if (state == "app.nav.webservices") { $scope.pageName = pageNames[1]; }
		if (state == "app.nav.datafeeds") { $scope.pageName = pageNames[2]; }
		if (state == "app.nav.widgets") { $scope.pageName = pageNames[3]; }
	}
});