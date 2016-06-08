export class MainController {
  constructor (toastr, DataService, $log, webSocketFactory, $scope) {
    'ngInject';

    var $this = this;

    $scope.meme = 'meme';

    webSocketFactory.on('connect', function() {
      console.log('yo im connected');
    });

    webSocketFactory.on('location', function(data) {
        console.log(data);
        this.determineStatus(data);
    });

    this.determineStatus = (data) => {
      if (data) {
        $scope.status = 'bezet';
      } else {
        $scope.status = 'vrij';
      }
    };

    this.getStatus = () => {
      let call_data = {
        suffix: '/locations/1',
        headers: {
          'content-type': 'application/json'
        }
      };

      DataService.getData(call_data).then((data) => {
        this.determineStatus(data);

      }).catch((response) => {
        $log.log(response);
      });
    };

    this.getStatus();

  }
}
