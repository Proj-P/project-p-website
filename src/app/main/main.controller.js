export class MainController {
  constructor (toastr, DataService, $log, webSocketFactory, $scope, $rootScope) {
    'ngInject';

    $scope.locationName = 'Tjuna Toilet';
    $scope.averageTime = 'No data';
    $scope.status = false; // false is free, true is occupied
    $scope.statusMsg = 'No data';

    // listen to websockets
    webSocketFactory.on('connect', () => {
      $log.info('Connected to WebSocket');
    });

    webSocketFactory.on('location', (data) => {
      $log.log(data);
      this.determineStatus(data);
      let average = Math.round((data.data.average_duration / 60));
      $scope.averageTime = average;
      $scope.locationName = data.data.name;
    });

    webSocketFactory.on('visit', (data) => {
      this.fillGraph(data.data);
    });

    // check the toilet status
    this.determineStatus = (data) => {
      if (data.data.occupied) {
        $scope.status = true;

      } else {
        $scope.status = false;
        $rootScope.occupied = false;
      }
    };

    // get status from API
    this.getStatus = () => {
      let call_data = {
        suffix: '/locations/2/',
        headers: {
          'content-type': 'application/json'
        }
      };

      DataService.getData(call_data).then((data) => {
        this.determineStatus(data);
        let average = Math.round((data.data.average_duration / 60));
        $scope.averageTime = average;

      }).catch((response) => {
        $log.log(response);
      });
    };

    // trigger so we get data when the page loads, not just when it changes
    this.getStatus();


    // graph
    $scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.series = ['Recent visits'];
    $scope.data = [
      [0, 0, 0, 0, 0, 0, 0]
    ];

    this.fillGraph = (data) => {
      angular.forEach(data.data, (val) => {
        let date = new Date(val.start_time);
        let dayNr = date.getDay() -1;
        $scope.data[0][dayNr] = $scope.data[0][dayNr] += 1;
      });
    };

    this.getGraphData = () => {
      let call_data = {
        suffix: '/visits/',
        headers: {
          'content-type': 'application/json'
        }
      };

      $scope.dates = [];

      DataService.getData(call_data).then((data) => {
        this.fillGraph(data);

      }).catch((response) => {
        $log.log(response);
      });
    };

    this.getGraphData();

  }
}
