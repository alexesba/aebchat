app.controller('loginCtrl', ['$scope','$location', '$rootScope', '$cookieStore', 'Session', function($scope, $location, $rootScope, $cookieStore, Session){
  $scope.email = null;
  $scope.password = null;

  $scope.login = function(){
    $location.path("/");
  }

}]);
