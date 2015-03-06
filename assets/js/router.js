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
