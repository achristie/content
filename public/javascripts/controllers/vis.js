app.controller('VisCtrl', function ($scope, $state) {
	$scope.stateName = $state.current.name;
});