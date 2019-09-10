
import { config }           from './index.config';
import { routerConfig }     from './index.route';
import { runBlock }         from './index.run';

import { MainController }     from './main/main.controller';

import { StatisticsController }  from './views/statistics/statistics.controller';

import { webSocketFactory }   from '../app/factories/open-web-socket.factory';
import { dateToDateFactory }  from '../app/factories/date-to-date.factory'

import { DataService }        from  '../app/services/data.service';

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
    apiUrl:   ' https://project-p.vps101.tjuna.com',
    webSocketUrl:   'https://project-p.vps101.tjuna.com:443',
    baseUrl:  '/',
    debug:    true
  })


  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .factory('webSocketFactory',            webSocketFactory)
  .factory('dateToDateFactory',           dateToDateFactory)

  .controller('StatisticsController',     StatisticsController)
  .controller('MainController',           MainController)

  .service('DataService',                 DataService);
