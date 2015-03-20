app.factory('Session', function ($http, $rootScope) {
  $rootScope.session = {};
  var Session = {
    data: {},
    conn: io.sails.connect('http://localhost:1337'),
    isLogged: function(){
      return !angular.equals({}, $rootScope.session);
    },
    updateSession: function(){
      this.conn.get('/session', function(response){
        Session.data = response;
        return $rootScope.session = Session.data;
      });
    }
  }
  Session.updateSession();
  return Session;
});
