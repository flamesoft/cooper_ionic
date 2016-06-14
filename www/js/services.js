angular.module('starter.services', [])

//to be able to both write to and read from our back-end database.
.factory('performaceData', function ($resource, API_URL) {
  return $resource(API_URL + '/data', {});
});
