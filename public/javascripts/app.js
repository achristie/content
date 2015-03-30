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
		.state('app.nav', {
			url: '',
			abstract: true,
			views: {
				'content@': {
					templateUrl: '/partials/layout'
				},
				'nav@app.nav': {
					templateUrl: '/partials/nav',
					controller: 'NavCtrl'
				},
				'content@app.nav': { 
					template: '<ui-view/>'
				}
			}
		})
		.state('app.nav.webservices', {
			url: 'webservices/:group/:subGroup',
			params: {
				group: {value: 'Intro'},
				subGroup: {value: 'Getting Started'}
			},
			views: {
				'content@app.nav': {
					templateUrl: '/partials/webservices',
					controller: 'WebServCtrl'
				}
			}
		})
});

app.run(function ($state, $rootScope, navData) {
	$rootScope.$state = $state;

	$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
		navData.onStateChange(e, toState, toParams, fromState, fromParams);
	});
});