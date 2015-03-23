app.controller('HeaderCtrl', function ($scope, $state) {
	pageNames = ['Content', 'Web Services', 'Data Feeds', 'Widgets'];

	$scope.$watch(function () {
		return $state.current.url;
	}, function (n, o) {
		setPageName(n);
	});

	$scope.getClass = function (pgNm) {
		if (pgNm === pageNames[0]) { return "text-content"; }
		if (pgNm === pageNames[1]) { return "text-ws"; }
		if (pgNm === pageNames[2]) { return "text-df"; }
		if (pgNm === pageNames[3]) { return "text-wdgt"; }
	};

	function setPageName(url) {
		if (url == "/") { $scope.pageName = pageNames[0]; }
		if (url == "webservices") { $scope.pageName = pageNames[1]; }
		if (url == "datafeeds") { $scope.pageName = pageNames[2]; }
		if (url == "widgets") { $scope.pageName = pageNames[3]; }
	}
});