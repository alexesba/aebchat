var app = angular.module('chatApp', ['ngRoute', 'ngResource', 'ngCookies']);

var redirect_to = function(route){
  return window.location.href = route;
};
io.socket.on('connect', function(){
  console.log('connection stablished');
  io.socket.get('/session', function(userinfo){
    if(typeof(userinfo) == 'undefined'){
      if(window.location.pathname != '/login'){
        redirect_to('login');
      }
    }
    // if(!userinfo.email){
    //   redirect_to('login');
    // }
  });
});

io.socket.on('disconnect', function(){
  alert('We loose the server connection');
});
