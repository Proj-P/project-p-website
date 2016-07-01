export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })

    .state('stats', {
      url: '/stats',
      templateUrl: 'app/views/statistics/statistics.view.html',
      controller: 'StatisticsController',
      controllerAs: 'stats'
    });

  $urlRouterProvider.otherwise('/');
}
