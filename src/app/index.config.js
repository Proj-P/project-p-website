export function config ($locationProvider, toastrConfig, $httpProvider, ChartJsProvider) {
  'ngInject';

  // This is to remove the trailing # in the URL.
  $locationProvider.html5Mode(true);

    ChartJsProvider.setOptions({
      colours : [ '#ff7878', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: true,
      maintainAspectRatio: true,
    });

  angular.extend(toastrConfig, {
    maxOpened: 4,
    positionClass: 'toast-bottom-right',
    progressBar: false,
    closeButton: false,
    autoDismiss: false,
    timeOut: 5000
  });

}
