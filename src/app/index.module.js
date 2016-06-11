
import { config }           from './index.config';
import { routerConfig }     from './index.route';
import { runBlock }         from './index.run';
import { MainController }   from './main/main.controller';

import { webSocketFactory }    from '../app/factories/open-web-socket.factory';

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
  'chart.js',
  'btford.socket-io'])
  // Constants, app wide values
  .value('envConfig', {
    apiUrl:   ' http://api.project-p.xyz',
    webSocketUrl:   'ws://api.project-p.xyz',
    baseUrl:  '/',
    debug:    true
  })


  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .factory('webSocketFactory',            webSocketFactory)

  .controller('MainController',           MainController)

  .service('DataService',                 DataService);
