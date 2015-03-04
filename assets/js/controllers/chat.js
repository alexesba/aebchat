app.controller('chatCtrl', ['$scope','$location', 'Session',  function($scope, $location, Session){
  $scope.currentUser = Session.data;
}]);
