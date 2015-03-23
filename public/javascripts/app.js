var app = angular.module('app', ['ngAnimate', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$stateProvider
		.state('app', {
			url: '/',
			views: {
				'header': {
					templateUrl: '/partials/header',
					controller: 'HeaderCtrl'
				},
				'content': {
					templateUrl: '/partials/index',
					controller: 'IndexCtrl'
				}
			}
		})
		.state('app.webservices', {
			url: 'webservices/{group}/{subGroup}',
			params: {
				group: {value: 'intro'},
				subGroup: {value: 'start'}
			},
			views: {
				'main@': {
					templateUrl: '/partials/webservices',
					controller: 'WebServCtrl'
				},
				'nav@': {
					templateUrl: '/partials/nav',
					controller: 'NavCtrl'
				}
			}
		})
		.state('app.datafeeds', {
			url: 'datafeeds',
			views: {
				'main@': {
					templateUrl: '/partials/datafeeds',
					controller: 'DataFeedCtrl'
				}
			}
		})
		.state('app.widgets', {
			url: 'widgets',
			views: {
				'main@': {
					templateUrl: '/partials/widgets',
					controller: 'WidgetCtrl'
				}
			}
		})
});

app.run(function ($state, $rootScope) {
	$rootScope.$state = $state;

});