export function dateToDateFactory($log, DataService) {
  'ngInject';
  let startDate = '2016-06-18';
  let endDate = '2016-06-24';

  return this.getStatus = () => {
    let call_data = {
      suffix: `/locations/2/visits/${startDate}/${endDate}/`,
      headers: {
        'content-type': 'application/json'
      }
    };

    DataService.getData(call_data).then((data) => {
      let result = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ];

      angular.forEach(data.data, (val) => {
        let date = new Date(val.start_time);
        let dayNr = date.getDay() -1;

        result[dayNr]++;
      });
      console.log(result);
    }).catch((response) => {
      $log.log(response);
    });
  };
}
