app.factory('Session', function ($http, $rootScope) {
  $rootScope.session = {};
  var Session = {
    data: {},
    isLogged: function(){
      return !angular.equals({}, $rootScope.session);
    },
    updateSession: function(){
      $http.get('/auth/session').then(function(response){
        console.log(response);
        Session.data = response.data;
        return $rootScope.session = Session.data;
      });
    }
  }
  Session.updateSession();
  return Session;
});
