angular.module('starter.services', [])

//to be able to both write to and read from our back-end database.
.factory('performanceData', function ($resource, API_URL) {
  return $resource(API_URL + '/data', {}, {
    query: {method: 'GET', isArray: false}
  });
});
