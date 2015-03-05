app.factory('Channel',['$resource', function($resource){
  var Channel = {
    list: {},
    updateChannel: function(){
      $resource('/channel').query({}, function(data){
        console.log(data);
        Channel.list  = data;
      });
    }
  }
  Channel.updateChannel();
  return Channel;
}]);
