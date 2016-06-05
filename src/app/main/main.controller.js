export class MainController {
  constructor (toastr, DataService, $log, webSocket) {
    'ngInject';

    this.meme = 'meme';

    $log.log('hey');
    this.MyData = webSocket;
    $log.log(this.MyData)


    this.status = 'unknown';

    // this.getStatus = () => {
    //   let call_data = {
    //     suffix: '/locations/2',
    //     headers: {
    //       'content-type': 'application/json'
    //     }
    //   };
    //
    //   DataService.getData(call_data).then((data) => {
    //     $this.status = data.data.occupied;
    //   }).catch((response) => {
    //     $log.log(response);
    //   });
    // }
    //
    // this.getStatus();

  }

}
