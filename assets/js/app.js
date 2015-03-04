var app = angular.module('chatApp', ['ngRoute', 'ngResource', 'ngCookies']);

app.factory('Session', function ($http, $rootScope) {
  $rootScope.session = {};
  var Session = {
    data: {},
    isLogged: function(){
      return !angular.equals({}, $rootScope.session);
    },
    updateSession: function(){
      $http.get('/auth/session').then(function(response){
        Session.data = response.data;
        return $rootScope.session = Session.data;
      });
    }
  }
  Session.updateSession();
  return Session;
});

app.config(function($routeProvider){
  $routeProvider.
   when('/login', {
     template: JST['assets/templates/login.ejs'],
     controller: 'loginCtrl',
     resolve: {
       // I will cause a 1 second delay
       delay: function($q, $timeout) {
         var delay = $q.defer();
         $timeout(delay.resolve, 2000);
         return delay.promise;
       }
     }
   }).when('/', {
     template: JST['assets/templates/home.ejs'],
     controller: 'chatCtrl'
   }).when('/dashboard', {
     template: JST['assets/templates/home.ejs'],
    controller: 'chatCtrl',
   });
}).run(function($rootScope, $location, Session) {
   $rootScope.location = $location;
    $rootScope.$watch('session', function(currenUser){
      if(Session.isLogged()){
        $rootScope.$emit('$loggedIn');
      }else{
        $rootScope.$emit('$sessionExpired');
      }
    });

    $rootScope.$on('$loggedIn', function(event, next, current){
       if($location.path() == '/login'){
         $location.path('/dashboard');
       }
    });

    $rootScope.$on('$sessionExpired', function(event, next, current){
       if($location.path() != '/login'){
         $rootScope.location.path('/login');
       }
    });

    $rootScope.$on('$routeChangeStart', function(next, current) {
      if(!Session.isLogged() && $location.path() != '/login'){
        $location.path('/login');
      }

    });
  });

app.controller('chatCtrl', ['$scope','$location', 'Session',  function($scope, $location, Session){
  $scope.currentUser = Session.data;
}]);

app.controller('loginCtrl', ['$scope','$location', '$rootScope', '$cookieStore', 'Session', function($scope, $location, $rootScope, $cookieStore, Session){
  $scope.email = null;
  $scope.password = null;

  $scope.login = function(){
    $location.path("/");
  }

}]);
