app.controller('chatCtrl', ['$scope','$location', 'Session',  function($scope, $location, Session){
  $scope.currentUser = Session.data;

  $scope.init = function(config){
    Session.data = config;
  };

}]);
