var app = angular.module('app', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'd3', 'jsonFormatter', 'duScroll', 'ngScrollSpy', 'ui.utils']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
	$urlRouterProvider.otherwise('/');

	//so user can navigate directly to /type
	$urlRouterProvider.when('/webservices', '/webservices/Intro/Getting Started')
	$urlRouterProvider.when('/datafeeds', '/datafeeds/Intro/Getting Started')
	$urlRouterProvider.when('/widgets', '/widgets/Intro/Getting Started')


	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$stateProvider
		.state('app', {
			url: '',
			abstract: true,
			views: {
				'header': {
					templateUrl: '/partials/header',
					controller: 'HeaderCtrl'
				},
				'content': {
					template: '<ui-view/>'
				}
			}
		})
		.state('app.index', {
			url: '/',
			views: {
				'content@': {
					templateUrl: '/partials/index',
					controller: 'IndexCtrl'
				}
			}
		})
		.state('app.globalDataCoverage', {
			url: '/gdc',
			views: {
				'content@': {
					templateUrl: '/partials/globalDataCoverage',
					controller: 'GlobalDataCoverageCtrl'
				}
			}
		})
		.state('app.nav', {
			url: '',
			abstract: true,
			views: {
				'content@': {
					templateUrl: '/navLayout'
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
			url: '/webservices/:group/:subGroup',
			params: {
				group: {value: null},
				subGroup: {value: null}
			},
			views: {
				'content@app.nav': {
					templateUrl: '/partials/webservices',
					controller: 'WebServCtrl'
				}
			}
		})
		.state('app.nav.datafeeds', {
			url: '/datafeeds/:group/:subGroup',
			views: {
				'content@app.nav': {
					templateUrl: '/partials/datafeeds',
					controller: 'DataFeedCtrl'
				}
			}
		})
		.state('app.nav.widgets', {
			url: '/widgets/:group/:subGroup',
			views: {
				'content@app.nav': {
					templateUrl: '/partials/widgets',
					controller: 'WidgetCtrl'
				}
			}
		})
});

app.run(function ($state, $rootScope, navData, stats) {
	$rootScope.$state = $state;

	$rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
		navData.onStateChange(e, toState, toParams, fromState, fromParams);
	});
});