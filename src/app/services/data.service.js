
// Include the class name within the dependencies of the controller you like to use it in.
export class DataService {
  constructor ($http, envConfig) {
    'ngInject';

    let service = {
      user: {
        data: ''
      }
    };

    /*
    // registerData
    */

    service.registerData = (data) => {

      let default_config = {
        method:     'POST',
        url:        `${envConfig.apiUrl}`,
        headers: {
          'content-type': 'application/json'
        }

      };

      return $http.post(default_config.url, data, {
        method:     default_config.method,
        headers:    default_config.headers
      })
      .then( (response) => {
        return response.data;
      });
    };

    /*
    //  postData
    */

    service.postData = (data) => {

      let default_config = {
        method:     'PUT',
        url:        `${envConfig.apiUrl}`,
        headers: {
          'content-type': 'application/json'
        }
      };

      return $http.put(default_config.url, data, {
        headers:    default_config.headers,
        method:     default_config.method

      })
      .then( (response) => {
        return response.data;
      });
    };

    /*
    //  getData
    */

    service.getData = (config) => {
      let url = `${envConfig.apiUrl}${config.suffix}`;
      return $http.get(url, config.data, {
        headers: config.headers
      })
      .then(function (response) {
        return response.data;
      });
    };

    return service;
  }
}
