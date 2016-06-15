angular.module('starter.controllers', [])


.controller('AppCtrl', function($rootScope,
                                 $scope,
                                 $ionicModal,
                                 $timeout,
                                 $auth,
                                 $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
   $ionicLoading.show({
     template: 'Logging in...'
   });
   $auth.submitLogin($scope.loginData)
     .then(function (resp) {
       // handle success response
       $ionicLoading.hide();
       $scope.closeLogin();
     })
     .catch(function (error) {
       $ionicLoading.hide();
       $scope.errorMessage = error;
     });
 };
 $rootScope.$on('auth:login-success', function(ev, user) {
   $scope.currentUser = angular.extend(user, $auth.retrieveData('auth_headers'));
 });

})

.controller('TestController', function($scope) {
  $scope.gender = ['Male', 'Female']
  $scope.ageValues = {
    min: 20,
    max: 60,
    value: 20
  };
  $scope.distanceValues = {
    min: 1000,
    max: 3500,
    value: 1000
  };
  $scope.data = {};
  $scope.calculateCooper = function() {
    var person = new Person({
      gender: $scope.data.gender,
      age: $scope.data.age
    });
    $scope.person = person;
    person.calculateVmax(person, $scope.data.distance);
    console.log($scope.person);
  };
})

.controller('PerformanceCtrl', function($scope, performanceData, $ionicLoading, $ionicPopup, $state){
  $scope.saveData = function(person){
    var data_perf = {performance_data: {data: {message: person.message}}};
    console.log(data_perf);
    $ionicLoading.show({
     template: 'Saving...'
    });
    performanceData.save(data_perf, function(response){
        console.log(response);
        $ionicLoading.hide();
        $scope.showAlert('Sucess', response.message);
      }, function(error){
        $ionicLoading.hide();
        $scope.showAlert('Failure', error.statusText);
        console.log(error);
      })
  };

  $scope.retrieveData = function(){
    $ionicLoading.show({
       template: 'Retrieving data...'
     });
     performanceData.query({}, function(response){
       $state.go('app.data', {savedDataCollection: response.entries});
       $ionicLoading.hide();
     }, function(error){
       $ionicLoading.hide();
       $scope.showAlert('Failure', error.statusText);
     })
  };

  $scope.showAlert = function(message, content) {
     var alertPopup = $ionicPopup.alert({
       title: message,
       template: content
     });
     alertPopup.then(function(res) {
     // Place some action here if needed...
     });
   };
})

.controller('DataCtrl', function($scope, $stateParams){
  $scope.$on('$ionicView.enter', function () {
    $scope.savedDataCollection = $stateParams.savedDataCollection;
  });
})
