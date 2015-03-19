var app = angular.module('app', ['ngAnimate', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			url: '/',
			views: {
				'header': {
					templateUrl: 'partials/header',
					controller: 'HeaderCtrl'
				},
				'content': {
					templateUrl: 'partials/index',
					controller: 'IndexCtrl'
				}
			}
		})
		.state('app.nav', {
			url: '',
			views: {
				'nav@': {
					templateUrl: 'partials/nav',
					controller: 'NavCtrl'
				}
			}
		})
		.state('app.nav.webservices', {
			url: 'webservices',
			views: {
				'main@': {
					templateUrl: 'partials/webservices',
					controller: 'WebServCtrl'
				}
			}
		})
});