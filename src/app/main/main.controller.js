export class MainController {
  constructor (toastr, DataService, $log, webSocketFactory, $scope, $rootScope, $filter) {
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
      // eslint-disable-next-line angular/json-functions
      data = JSON.parse(data);
      $log.log(data);
      this.determineStatus(data);
      let averageMin = Math.floor(data.average_duration / 60);
      let averageSec = Math.floor(data.average_duration % 60);

      $scope.averageTime = `${averageMin}m ${averageSec}s`
      $scope.locationName = data.name;
    });

    webSocketFactory.on('visit', (data) => {
      this.fillGraph(data);
    });

    // check the toilet status
    this.determineStatus = (data) => {
      if (data.occupied) {
        $scope.status = true;

      } else {
        $scope.status = false;
        $rootScope.occupied = false;
      }
    };

    // get status from API
    this.getStatus = () => {
      let call_data = {
        suffix: '/locations/1/',
        headers: {
          'content-type': 'application/json'
        }
      };

      DataService.getData(call_data).then((response) => {
        this.determineStatus(response.data);
        let averageMin = Math.floor(response.data.average_duration / 60);
        let averageSec = Math.floor(response.data.average_duration % 60);

        $scope.averageTime = `${averageMin}m ${averageSec}s`;

      }).catch((response) => {
        $log.log(response);
      });
    };

    // trigger so we get data when the page loads, not just when it changes
    this.getStatus();

    $scope.test = () => {
      $scope.data = $scope.data.map(function (data) {
        return data.map(function (y) {
          y = 0;
          return y;
        });
      });
    };


    // graph
    $scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.series = ['This week', 'Last week', '3 weeks ago', '4 weeks ago', '5 weeks ago', '6 weeks ago', '7 weeks ago', '8 weeks ago','9 weeks ago', '10 weeks ago'];
    $scope.data = [
      [0, 0, 0, 0, 0, 0, 0]
    ];

    this.fillGraph = (data) => {

      let today = new Date();
      // get the weeknumber of today
      let todayWeek = $filter('date')(today, 'ww');


      angular.forEach(data, (val) => {

        // make a date of the start time of the visit
        let date = new Date(val.start_time);
        let dayNr = date.getDay() -1; // -1 so it places it in the correct spot

        // get the weeknumber of the start_time
        let dateWeek = $filter('date')(date, 'ww');

        // determine the place in the array
        let arrayPlace = dateWeek - todayWeek;

        // if the date is in the same week as today add it to the array
        if (dateWeek === todayWeek) {
          $scope.data[0][dayNr] = $scope.data[0][dayNr] += 1; // append

          // check if array exists and doesn't go further then x
        } else if (arrayPlace <= 0) {

          if ($scope.data[arrayPlace]) {
            $scope.data[arrayPlace][dayNr] = $scope.data[arrayPlace][dayNr] += 1;
          }
        }
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
