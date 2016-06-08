export function config ($locationProvider, toastrConfig, $httpProvider) {
  'ngInject';

  // This is to remove the trailing # in the URL.
  $locationProvider.html5Mode(true);

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  angular.extend(toastrConfig, {
    maxOpened: 4,
    positionClass: 'toast-bottom-right',
    progressBar: true,
    closeButton: true
  });

}
