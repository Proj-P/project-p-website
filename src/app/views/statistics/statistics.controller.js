export class StatisticsController {
  constructor (DataService, $scope, $log) {
    'ngInject';

    $scope.locationName = 'Tjuna Toilet';
    $scope.averageTime = 'No data';
    $scope.status = false; // false is free, true is occupied
    $scope.statusMsg = 'No data';

    let $this = this;

    this.startDate = '';
    this.endDate = '';

    // check the toilet status
    this.determineStatus = (data, type) => {
      if (type == 'api') {
        if (data.occupied) {
          this.status = true;

        } else {
          this.status = false;
        }
      }
    };

    this.formattedDate = (date) => {
      let month =  date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1),
          day = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate(),
          year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

    // get data with user inputted dates
    this.getDataWithInput = () => {
      let submitStartDate = this.formattedDate($this.startDate);
      let submitEndDate = this.formattedDate($this.endDate);

      let call_data = {
        suffix: `/locations/1/visits/${submitStartDate}/${submitEndDate}`,
        headers: {
          'content-type': 'application/json'
        }
      };

      DataService.getData(call_data).then((data) => {
        $scope.data = [
          [0, 0, 0, 0, 0, 0, 0]
        ];
        this.fillGraph(data);

      }).catch((response) => {
        $log.log(response);
      });
    };

    // get status from API
    this.getStatus = () => {
      let call_data = {
        suffix: '/locations/1/',
        headers: {
          'content-type': 'application/json'
        }
      };

      DataService.getData(call_data).then((data) => {
        let type = 'api';
        this.determineStatus(data, type);
        let average = Math.round((data.average_duration / 60));
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
      angular.forEach(data, (val) => {
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
