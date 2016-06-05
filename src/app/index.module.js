
import { config }           from './index.config';
import { routerConfig }     from './index.route';
import { runBlock }         from './index.run';
import { MainController }   from './main/main.controller';

import { webSocket }    from '../app/factories/open-web-socket.factory';

import { DataService }      from  '../app/services/data.service';

angular.module('projectpAngular', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ngResource',
  'ui.router',
  'toastr',
  'ngWebSocket'])
  // Constants, app wide values
  .value('envConfig', {
    apiUrl:   'http://192.168.2.26:8080/',
    baseUrl:  '/',
    debug:    true
  })


  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .factory('webSocket',                      webSocket)

  .controller('MainController',           MainController)

  .service('DataService',                 DataService);
