export function config ($locationProvider, toastrConfig) {
  'ngInject';

  // This is to remove the trailing # in the URL.
  $locationProvider.html5Mode(true);

  angular.extend(toastrConfig, {
    maxOpened: 4,
    positionClass: 'toast-bottom-right',
    progressBar: true,
    closeButton: true
  });

}
