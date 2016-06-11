export class MainController {
  constructor (toastr, DataService, $log, webSocketFactory, $scope) {
    'ngInject';

    $scope.locationName = 'Toilet downstairs'
    $scope.averageTime = '3'
    $scope.status = false;
    $scope.statusMsg = 'No data';

    // listen to websockets
    webSocketFactory.on('connect', () => {
      $log.log('yo im connected');
    });

    webSocketFactory.on('location', (data) => {
      let type = 'websocket';
      this.determineStatus(data, type);
    });

    webSocketFactory.on('visit', (data) => {
      $log.log(data);
    });

    // check the toilet status
    this.determineStatus = (data, type) => {
      if (type == 'api') {
        if (data.data.occupied) {
          this.status = true;
          $scope.statusMsg = 'Occupied';
        } else {
          this.status = false;
          $scope.statusMsg = 'Free';
        }
      } else if (type == 'websocket') {
        if (data.location.occupied) {
          this.status = true;
          $scope.statusMsg = 'Occupied';
        } else {
          $scope.status = false;
          $scope.statusMsg = 'Free';
        }
      }
    };

    // get status from API
    this.getStatus = () => {
      let call_data = {
        suffix: '/locations/1',
        headers: {
          'content-type': 'application/json'
        }
      };

      DataService.getData(call_data).then((data) => {
        let type = 'api';
        this.determineStatus(data, type);

      }).catch((response) => {
        $log.log(response);
      });
    };

    // trigger so we get data when the page loads, not just when it changes
    this.getStatus();

  }
}
