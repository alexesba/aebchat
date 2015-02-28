var app = angular.module('chatApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.
   when('/login', {
     template: JST['assets/templates/login.ejs'],
     controller: 'loginCtrl'
   }).
   when('/', {
     template: JST['assets/templates/home.ejs'],
     controller: 'chatCtrl'
   })
}).
run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.controller === "loginCtrl") {
        } else {
          $location.path("/login");
        }
      }
    });
  });

app.controller('chatCtrl', ['$scope','$location',  function($scope, $location){

}]);

app.controller('loginCtrl', ['$scope','$location', '$rootScope', function($scope, $location, $rootScope){
  $scope.email = null;
  $scope.password = null;
  $scope.login = function(){
    $rootScope.loggedInUser = $scope.email;
    $location.path("/");
  }
}]);
